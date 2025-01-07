import * as deepar from 'deepar';

export const initDeepAR = async () => {
  const deepAR = await deepar.initialize({
    licenseKey: import.meta.env.VITE_DEEPAR_APP_KEY,
    previewElement: document.querySelector('#deepar-div'),
    effect: 'https://cdn.jsdelivr.net/npm/deepar/effects/aviators'
  });

  return deepAR;
};
