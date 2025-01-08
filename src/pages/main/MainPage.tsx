import { useEffect } from 'react';
import * as deepar from 'deepar';

const DeepARComponent = () => {
  useEffect(() => {
    async function some() {
      const deepAR = await deepar.initialize({
        licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
        // @ts-expect-error
        canvas: document.getElementById('deepar-canvas'),
        // effect: 'src/effects/Omega_f.deepar',
        effect: '/ready/Omega_f.deepar'
        // effect: 'src/effects/TitonEffect.deepar'
        // effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
        // effect: 'src/effects/Elephant_Trunk.deepar',
        // effect: 'src/effects/Omega_f.deepar',
      });

      console.log('deepAR', deepAR);
    }
    some();
  }, []);

  return (
    <div>
      <h1>DeepAR with React</h1>
      <canvas id='deepar-canvas' width='1280' height='720'></canvas>
    </div>
  );
};

export default DeepARComponent;
