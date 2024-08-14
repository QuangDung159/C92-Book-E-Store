import * as StringHelpers from './string-helpers';
import * as ToastHelpers from './toast-helpers';

export { StringHelpers, ToastHelpers };

export const delay = async (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, milliseconds);
  });
};
