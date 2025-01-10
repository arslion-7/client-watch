import { useEffect, useMemo, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { watchesCollectionRef } from '@/configs/firebaseConfig';
import { IWatch } from '@/models/watchModel';

const DeepARComponent = () => {
  const navigate = useNavigate();

  const [watches, setWatches] = useState<IWatch[]>([]);

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

  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <h1 className='text-3xl font-bold underline text-center mb-4'>
          Select watch
        </h1>
        {watches.map((watch) => (
          <button
            key={watch.id}
            className='bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full m-2'
            onClick={() => navigate(watch.id)}
          >
            {watch.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeepARComponent;
