import { USER } from '@constants';
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

export const AuthenticationServices = {
  signUp,
  sendVerificationCode,
  submitVerficationCode,
};
