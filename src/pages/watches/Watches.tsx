import { useEffect, useState } from 'react';
import { db } from '@/configs/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

interface IWatch {
  id: string;
  name: string;
}

export default function Watches() {
  const [watches, setWatches] = useState<IWatch[]>([]);

  const watchesCollectionRef = collection(db, 'watches');

  useEffect(() => {
    const getWatches = async () => {
      try {
        const data = await getDocs(watchesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...(doc.data() as IWatch),
          id: doc.id,
        }));
        console.log('filteredData', filteredData);
        setWatches(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getWatches();
  }, [watchesCollectionRef]);

  return (
    <div>
      {watches.map((watch) => (
        <div key={watch.id}>
          <h1>{watch.name}</h1>
        </div>
      ))}
    </div>
  );
}
