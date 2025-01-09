import { useEffect, useMemo, useState, useRef } from 'react';
import * as deepar from 'deepar';
import { db } from '@/configs/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import LoadingSpinner from '@/components/LoadingSpinner';

interface IWatch {
  id: string;
  name: string;
  url: string;
}

const watchesCollectionRef = collection(db, 'watches');

const DeepARComponent = () => {
  const deepARRef = useRef<deepar.DeepAR>();
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [selectedWatch, setSelectedWatch] = useState<IWatch>();
  const [isLoadingDeepARInit, setIsLoadingDeepARInit] = useState(false);
  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  // Use useMemo to memoize the query function only if db or watchesCollectionRef changes
  const getWatchesQuery = useMemo(
    () => async () => {
      try {
        const snapshot = await getDocs(watchesCollectionRef);
        const filteredData = snapshot.docs.map((doc) => ({
          ...(doc.data() as IWatch),
          id: doc.id
        }));
        setWatches(filteredData);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  useEffect(() => {
    getWatchesQuery();
  }, [getWatchesQuery]);

  useEffect(() => {
    async function some() {
      setIsLoadingDeepARInit(true);
      try {
        const deepAR = await deepar.initialize({
          licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
          // @ts-expect-error
          canvas: document.getElementById('deepar-canvas')
          // effect: 'src/effects/ready/Omega_f.deepar',
        });
        deepARRef.current = deepAR;
        console.log('deepAR', deepAR);
      } catch (error) {
        console.log('Error on initializing DeepAR', error);
      } finally {
        setIsLoadingDeepARInit(false);
      }
    }
    some();
    return () => {
      deepARRef.current?.shutdown();
    };
  }, []);

  useEffect(() => {
    const switchFilter = async () => {
      setIsLoadingFilter(true);
      deepARRef.current?.clearEffect();
      try {
        await deepARRef.current?.switchEffect(
          selectedWatch!.url
            .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
            .replace('dl=0', 'dl=1')
        );
      } catch (error) {
        console.log('Error on switching filter', error);
      } finally {
        setIsLoadingFilter(false);
      }
    };

    if (selectedWatch) {
      switchFilter();
    }
  }, [selectedWatch]);

  // const canvasRef = useRef<HTMLCanvasElement>(null);

  // const [width, setWidth] = useState();
  // const [height, setHeight] = useState();

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.width = window.innerWidth;
  //     canvasRef.current.height = window.innerHeight;
  //   }
  // }, []);

  return (
    <div
    // style={{
    //   width: '100vw',
    //   height: '100vh'
    // }}
    >
      <h1 className='text-3xl font-bold underline'>Select watch</h1>
      {watches.map((watch) => (
        <button
          key={watch.id}
          style={{ margin: '10px' }}
          onClick={() => setSelectedWatch(watch)}
        >
          {watch.name}
        </button>
      ))}
      <div
        className='room-blur'
        style={{ display: !isLoadingDeepARInit ? 'none' : 'flex' }}
      >
        <LoadingSpinner />
      </div>
      <div
        className='room-blur'
        style={{ display: !isLoadingFilter ? 'none' : 'flex' }}
      >
        <LoadingSpinner text='Bring your model to life' />
      </div>
      <canvas
        // ref={canvasRef}
        style={{
          display: isLoadingDeepARInit ? 'none' : 'block'
        }}
        id='deepar-canvas'
        width='480px'
        height='720px'
      ></canvas>
    </div>
  );
};

export default DeepARComponent;
