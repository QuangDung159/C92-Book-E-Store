import * as StringHelpers from './string-helpers';

export { StringHelpers };

export const delay = async (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, milliseconds);
  });
};
