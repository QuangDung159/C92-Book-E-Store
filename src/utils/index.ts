import * as DatetimeHelpers from './datetime-helpers';
import * as ListHelpers from './list-helpers';
import * as StringHelpers from './string-helpers';
import * as ToastHelpers from './toast-helpers';

export { DatetimeHelpers, ListHelpers, StringHelpers, ToastHelpers };

export const delay = async (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, milliseconds);
  });
};
