// import * as deepar from 'deepar';

// const deeparConfig = await deepar.initialize({
//   licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
//   previewElement: document.querySelector('#deepar-div'),
//   effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
// });

// export { deeparConfig };

import * as deepar from 'deepar';

// interface DeepARConfig {
//   licenseKey: string;
//   previewElement: HTMLCanvasElement; // Use a specific type for the preview element
//   effect: string;
// }

export const initializeDeepAR = async (): Promise<deepar.DeepAR | null> => {
  try {
    const licenseKey = import.meta.env.VITE_DEEPAR_APP_KEY; // Access environment variable
    const previewElement = document.querySelector(
      '#deepar-div'
    ) as HTMLCanvasElement; // Type assertion for safety

    if (!licenseKey || !previewElement) {
      console.error(
        'Missing DeepAR configuration: license key or preview element'
      );
      return null;
    }

    const deepARInstance = await deepar.initialize({
      licenseKey,
      canvas: previewElement, // Use canvas property for consistency
      effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
    });

    return deepARInstance;
  } catch (error) {
    console.error('DeepAR initialization error:', error);
    return null;
  }
};

export default initializeDeepAR;
