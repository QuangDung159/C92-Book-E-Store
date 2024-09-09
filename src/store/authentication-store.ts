import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { ServiceResultHandler } from '@types';
import { delay, ToastHelpers } from '@utils';
import { SharedStore } from './shared-store';
import { UserStore } from './user-store';

class AuthenticationStore {
  userStore: UserStore | null = null;
  sharedStore: SharedStore | null = null;
  googleSigned: boolean = false;
  facebookSigned: boolean = false;

  constructor(userStore: UserStore, sharedStore: SharedStore) {
    makeObservable(this, {
      userStore: observable,
      sharedStore: observable,
      googleSigned: observable,
      facebookSigned: observable,
      setFacebookSigned: action,
      setGoogleSigned: action,
    });

    this.userStore = userStore;

    this.sharedStore = sharedStore;
  }

  setFacebookSigned(value: boolean) {
    this.facebookSigned = value;
  }

  setGoogleSigned(value: boolean) {
    this.googleSigned = value;
  }

  signIn = async (username: string, password: string) => {
    await delay(1000);

    await this.sharedStore.setStorageValue(
      'userId',
      '66df0b51f3cad97040c10e02',
    );

    this.fetchUser();

    // this.userStore.setUserProfile({
    //   ...this.userStore.userProfile,
    //   username,
    //   password,
    // });
  };

  signUp = async (user: DataModels.IUser) => {
    await delay(1000);
    this.userStore.setUserProfile({
      ...this.userStore.userProfile,
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

    this.sharedStore.removeStorageItem('userId');
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
        ...this.userStore.userProfile,
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
        ...this.userStore.userProfile,
        email: data.email,
        username: data.first_name,
        avatarUrl: data.picture?.data?.url,
      });
    }
  };

  fetchUser = async () => {
    const userId = await this.sharedStore.getStorageValue('userId');

    console.log('userId :>> ', userId);

    if (userId) {
      const result = await AuthenticationServices.fetchUser(userId);

      if (result?.success) {
        const user = result.data?.user;
        this.userStore.setUserProfile(user);
      }
    }
  };
}

export { AuthenticationStore };
