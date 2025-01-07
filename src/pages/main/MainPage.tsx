import initializeDeepAR from '@/configs/deepARConfig';
import { useEffect, useRef } from 'react'; // Import initialization function
import * as deepar from 'deepar';

const DeepARComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deepARRef = useRef<deepar.DeepAR | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const deepARInstance = await initializeDeepAR();
      if (deepARInstance) {
        deepARRef.current = deepARInstance;
      }
    };

    initialize();

    return () => {
      // Cleanup function (optional)
      if (deepARRef.current) {
        // Add any necessary cleanup for DeepAR instance (e.g., stop video, shutdown)
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '640px', height: '360px' }} />
    </div>
  );
};

export default DeepARComponent;
