import { action, makeObservable, observable } from 'mobx';
import { USER } from '@constants';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { ServiceResultHandler } from '@types';
import { delay, ToastHelpers } from '@utils';
import { UserStore } from './user-store';

class AuthenticationStore {
  userStore: UserStore | null = null;
  googleSigned: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      userStore: observable,
      googleSigned: observable,
      setGoogleSigned: action,
    });

    this.userStore = userStore;
  }

  setGoogleSigned(value: boolean) {
    this.googleSigned = value;
  }

  signIn = async (username: string, password: string) => {
    await delay(1000);
    this.userStore.setUserProfile({
      ...USER,
      username,
      password,
    });
  };

  signUp = async (user: DataModels.IUser) => {
    await delay(1000);
    this.userStore.setUserProfile({
      ...USER,
      email: user.email,
      username: user.username,
    });
  };

  signOut = async () => {
    await delay(1000);
    this.userStore.setUserProfile(null);
    ToastHelpers.showToast({
      title: 'Account',
      content: 'Sign out success',
    });
  };

  sendVerificationCode = async (handler: ServiceResultHandler) => {
    const result = await AuthenticationServices.sendVerificationCode(
      handler.params?.email,
    );

    if (result.success) {
      handler.onSuccess?.();
    } else {
      handler.onFail?.();
    }

    return result;
  };

  submitVerficationCode = async (handler: ServiceResultHandler) => {
    const result = await AuthenticationServices.submitVerficationCode(
      handler.params?.code,
    );

    if (result.success) {
      handler.onSuccess?.();
    } else {
      handler.onFail?.();
    }

    return result;
  };

  googleSignIn = async () => {
    const response = await AuthenticationServices.googleSignIn();

    if (response?.user) {
      const user = response.user;
      this.userStore.setUserProfile({
        ...USER,
        email: user.email,
        username: user.name,
      });

      this.setGoogleSigned(true);

      ToastHelpers.showToast({
        title: 'Account',
        content: 'Sign in success',
      });
    }
  };

  googleSignOut = async () => {
    await AuthenticationServices.googleSignOut();
    this.setGoogleSigned(false);
    this.signOut();
  };
}

export { AuthenticationStore };
