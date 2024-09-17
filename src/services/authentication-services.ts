import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios, { AxiosResponse } from 'axios';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { API_URL } from '@constants';
import { DataModels } from '@models';
import { SignUpMethod } from '@types';
import { delay, ToastHelpers } from '@utils';
import { HttpServices } from './http-services';

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

const facebookSignIn: () => Promise<
  AxiosResponse<any, any>
> | null = async () => {
  try {
    const loginResult = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (!loginResult.isCancelled) {
      return await AccessToken.getCurrentAccessToken().then(async (data) => {
        const token = data?.accessToken;
        const response = await axios.get('https://graph.facebook.com/me', {
          params: {
            fields: 'id,first_name,last_name,email,picture',
            access_token: token,
          },
        });

        return response;
      });
    }
    return null;
  } catch (error) {
    console.error('Facebook login failed', error);
    return null;
  }
};

const facebookSignOut = async () => {};

const createCreditCard = async (params: DataModels.ICreditCardParams) => {
  return await HttpServices.post(API_URL.creditCard + '/create-one', params);
};

const fetchUser = async (userId: string) => {
  return await HttpServices.get(API_URL.user + '/get-one/' + userId);
};

const signIn = async (params: {
  email: string;
  password: string;
  notificationToken: string;
}) => {
  return await HttpServices.post(API_URL.user + '/sign-in', params);
};

const signUp = async (params: {
  email: string;
  password?: string;
  signUpMethod: SignUpMethod;
  ssoToken?: string;
  username: string;
  phoneNumber?: string;
  avatarUrl?: string;
}) => {
  return await HttpServices.post(API_URL.user + '/sign-up', params);
};

export const AuthenticationServices = {
  signUp,
  sendVerificationCode,
  submitVerficationCode,
  googleSignIn,
  googleSignOut,
  facebookSignIn,
  facebookSignOut,
  createCreditCard,
  fetchUser,
  signIn,
};
