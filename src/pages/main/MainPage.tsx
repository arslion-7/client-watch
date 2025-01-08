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
        // effect: 'src/effects/Omega_f.deepar',
        effect: 'src/effects/ready/Omega_f.deepar',
        // effect: 'src/effects/TitonEffect.deepar'
        // effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
        // effect: 'src/effects/Elephant_Trunk.deepar',
        // effect: 'src/effects/Omega_f.deepar',
      });

      console.log('deepAR', deepAR);
    }
    some();
  }, []);

  console.log('watches', watches);

  return (
    <div>
      <h1>DeepAR with React</h1>
      <canvas id='deepar-canvas' width='1280' height='720'></canvas>
    </div>
  );
};

export default DeepARComponent;
