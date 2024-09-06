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
  facebookSigned: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      userStore: observable,
      googleSigned: observable,
      facebookSigned: observable,
      setFacebookSigned: action,
      setGoogleSigned: action,
    });

    this.userStore = userStore;
  }

  setFacebookSigned(value: boolean) {
    this.facebookSigned = value;
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
    if (this.googleSigned) {
      await this.googleSignOut();
    }

    if (this.facebookSigned) {
      await this.facebookSignOut();
    }

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
        avatarUrl: user.photo,
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
  };

  facebookSignOut = async () => {
    await AuthenticationServices.facebookSignOut();
    this.setFacebookSigned(false);
  };

  facebookSignIn = async () => {
    const response = await AuthenticationServices.facebookSignIn();

    if (response?.status === 200) {
      const data = response.data;
      this.userStore.setUserProfile({
        ...USER,
        email: data.email,
        username: data.first_name,
        avatarUrl: data.picture?.data?.url,
      });
    }
  };

  fetchUser = async () => {
    const result = await AuthenticationServices.fetchUser(
      '66d821f534d631e25f9066e3',
    );

    if (result?.success) {
      const user = result.data?.user;
      this.userStore.setUserProfile(user);
    }
  };
}

export { AuthenticationStore };
