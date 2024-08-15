import * as ListHelpers from './list-helpers';
import * as StringHelpers from './string-helpers';
import * as ToastHelpers from './toast-helpers';

export { ListHelpers, StringHelpers, ToastHelpers };

export const delay = async (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, milliseconds);
  });
};
