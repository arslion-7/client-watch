import { useEffect, useMemo, useState } from 'react';
import * as deepar from 'deepar';
import { db } from '@/configs/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

interface IWatch {
  id: string;
  name: string;
  url: string;
}

const watchesCollectionRef = collection(db, 'watches');

const DeepARComponent = () => {
  const [selectedWatch, setSelectedWatch] = useState<IWatch>();

  const [watches, setWatches] = useState<IWatch[]>([]);

  // Use useMemo to memoize the query function only if db or watchesCollectionRef changes
  const getWatchesQuery = useMemo(
    () => async () => {
      try {
        const snapshot = await getDocs(watchesCollectionRef);
        const filteredData = snapshot.docs.map((doc) => ({
          ...(doc.data() as IWatch),
          id: doc.id,
        }));
        setWatches(filteredData);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  // Optionally use useEffect with an empty dependency array for initial fetch
  useEffect(() => {
    getWatchesQuery();
  }, [getWatchesQuery]); // Empty dependency array for initial fetch

  useEffect(() => {
    async function some() {
      const deepAR = await deepar.initialize({
        licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
        // @ts-expect-error
        canvas: document.getElementById('deepar-canvas'),
        // effect: 'src/effects/ready/Omega_f.deepar',
        effect: selectedWatch?.url
          .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
          .replace('dl=0', 'dl=1'),
      });

      console.log('deepAR', deepAR);
    }
    some();
  }, [watches, selectedWatch]);

  console.log('watches', watches);
  console.log('selectedWatch', selectedWatch);

  return (
    <div>
      {watches.map((watch) => (
        <button
          key={watch.id}
          style={{ margin: '10px' }}
          onClick={() => setSelectedWatch(watch)}
        >
          {watch.name}
        </button>
      ))}
      <canvas id='deepar-canvas' width='1280' height='720'></canvas>
    </div>
  );
};

export default DeepARComponent;
