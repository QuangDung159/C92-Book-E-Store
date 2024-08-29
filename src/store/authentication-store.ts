import { makeObservable, observable } from 'mobx';
import { USER } from '@constants';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { ServiceResultHandler } from '@types';
import { delay } from '@utils';
import { UserStore } from './user-store';

class AuthenticationStore {
  userStore: UserStore | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      userStore: observable,
    });

    this.userStore = userStore;
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
    console.log('response :>> ', response);
    if (response?.user) {
      const user = response.user;
      this.userStore.setUserProfile({
        ...USER,
        email: user.email,
        username: user.name,
      });
    }
  };

  googleSignOut = async () => {
    await AuthenticationServices.googleSignOut();
    this.signOut();
  };
}

export { AuthenticationStore };
