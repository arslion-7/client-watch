import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import * as deepar from 'deepar';
import { getDoc, doc } from 'firebase/firestore';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useParams } from 'react-router';
import { watchesCollectionRef } from '@/configs/firebaseConfig';
import { IWatch } from '@/models/watchModel';

const DeepARComponent = () => {
  const { id } = useParams();
  const [selectedWatch, setSelectedWatch] = useState<IWatch>();

  useLayoutEffect(() => {
    async function getWatch() {
      const docRef = doc(watchesCollectionRef, id!);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        console.log('Document data:', snapshot.data());
        setSelectedWatch({ ...(snapshot.data() as IWatch), id: snapshot.id });
      } else {
        console.log('No such document!');
      }
    }
    if (id) {
      getWatch();
    }
  }, []);

  const deepARRef = useRef<deepar.DeepAR>();
  const [isLoadingDeepARInit, setIsLoadingDeepARInit] = useState(false);

  useEffect(() => {
    async function some() {
      setIsLoadingDeepARInit(true);
      try {
        const deepAR = await deepar.initialize({
          licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
          // @ts-expect-error
          canvas: document.getElementById('deepar-canvas'),
          effect: selectedWatch!.url
            .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
            .replace('dl=0', 'dl=1'),
          additionalOptions: {
            cameraConfig: {
              facingMode: 'environment'
            }
          }
        });
        deepARRef.current = deepAR;
        console.log('deepAR', deepAR);
      } catch (error) {
        console.log('Error on initializing DeepAR', error);
      } finally {
        setIsLoadingDeepARInit(false);
      }
    }
    if (selectedWatch) {
      some();
    }

    return () => {
      deepARRef.current?.shutdown();
    };
  }, [selectedWatch]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  return (
    <div>
      <div
        className='room-blur'
        style={{ display: !isLoadingDeepARInit ? 'none' : 'flex' }}
      >
        <LoadingSpinner text='Bring your model to life' />
      </div>
      <canvas
        ref={canvasRef}
        style={{
          display: isLoadingDeepARInit ? 'none' : 'block'
        }}
        id='deepar-canvas'
      ></canvas>
    </div>
  );
};

export default DeepARComponent;
