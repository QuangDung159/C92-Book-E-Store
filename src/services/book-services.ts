import { TOP_BOOKS, USER } from '@constants';
import { DataModels } from '@models';
import { delay } from '@utils';

const signUp = async () => {
  // await delay(1000);

  return USER;
};

const sendVerificationCode = async (email: string) => {
  await delay(1000);
  if (email === 'user@mail.com') {
    return {
      success: true,
    } as DataModels.ServiceResult<any>;
  }
  return {
    success: false,
  } as DataModels.ServiceResult<any>;
};

const submitVerficationCode = async (code: string) => {
  await delay(1000);

  return {
    success: true,
    data: code,
  } as DataModels.ServiceResult<any>;
};

const loadListFavourite = async () => {
  await delay(1000);
  const result = TOP_BOOKS.filter((item) => item.isLiked);

  return {
    success: true,
    data: {
      list: result,
    },
  } as DataModels.ServiceResult<any>;
};

const loadListViewed = async () => {
  await delay(1000);
  const result = TOP_BOOKS.filter((item) => item.isLiked);

  return {
    success: true,
    data: {
      list: result,
    },
  } as DataModels.ServiceResult<any>;
};

export const BookServices = {
  signUp,
  sendVerificationCode,
  submitVerficationCode,
  loadListFavourite,
  loadListViewed,
};
