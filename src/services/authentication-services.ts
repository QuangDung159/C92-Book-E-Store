import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { USER } from '@constants';
import { DataModels } from '@models';
import { delay, ToastHelpers } from '@utils';

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

const googleSignIn = async () => {
  await delay(1000);

  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    let errorMessage = error;

    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          errorMessage = 'Cancelled the login';
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          errorMessage = 'Already in progress';
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          errorMessage = 'Play services not available or outdated';
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }

    if (error) {
      ToastHelpers.showToast({
        title: 'Error',
        content: errorMessage,
        type: 'error',
      });
    }

    return null;
  }
};

const googleSignOut = async () => {
  await delay(1000);
  await GoogleSignin.signOut();
};

export const AuthenticationServices = {
  signUp,
  sendVerificationCode,
  submitVerficationCode,
  googleSignIn,
  googleSignOut,
};
