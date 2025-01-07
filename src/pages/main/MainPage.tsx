import { initDeepAR } from '@/configs/deepARConfig';
import { useEffect, useRef } from 'react';

const DeepARComponent = () => {
  const arContainerRef = useRef(null);

  useEffect(() => {
    async function initOfInit() {
      await initDeepAR();
    }

    initOfInit();
  }, []);

  // ... rest of your component

  return (
    <div>
      <h1>DeepAR with React</h1>
      {/* AR Preview Container */}
      <div
        id='deepar-div'
        ref={arContainerRef} // Connect the ref to the element
        style={{ width: '640px', height: '480px', background: 'black' }}
      />
    </div>
  );
};

export default DeepARComponent;
