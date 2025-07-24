import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { ServiceResultHandler, SignUpMethod } from '@types';
import { delay, ToastHelpers } from '@utils';
import { SharedStore } from './shared-store';
import { UserStore } from './user-store';

class AuthenticationStore {
  userStore: UserStore | null = null;
  sharedStore: SharedStore | null = null;
  googleSigned: boolean = false;
  facebookSigned: boolean = false;
  appleSigned: boolean = false;

  constructor(userStore: UserStore, sharedStore: SharedStore) {
    makeObservable(this, {
      userStore: observable,
      sharedStore: observable,
      googleSigned: observable,
      facebookSigned: observable,
      appleSigned: observable,
      setFacebookSigned: action,
      setGoogleSigned: action,
      setAppleSigned: action,
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

  setAppleSigned(value: boolean) {
    this.appleSigned = value;
  }

  onSignInSuccess = async (user: DataModels.IUser) => {
    await this.sharedStore.setStorageValue('userId', user.id);
    await delay(500);
    this.fetchUser();

    ToastHelpers.showToast({
      title: 'Success',
      content: 'Sign in success',
    });
  };

  signIn = async (
    email: string,
    password: string,
    notificationToken: string,
    onSuccess?: () => void,
    onFail?: (result?: DataModels.ServiceResult<any>) => void,
  ) => {
    const result = await AuthenticationServices.signIn({
      email,
      password,
      notificationToken,
    });

    if (result?.success && result.data) {
      const user = result.data.user as DataModels.IUser;

      await this.onSignInSuccess(user);
      onSuccess?.();
    } else {
      onFail?.(result);
    }
  };

  signUp = async (
    user: DataModels.IUser,
    onSuccess?: () => void,
    onFail?: (result?: DataModels.ServiceResult<any>) => void,
  ) => {
    const { email, password, username, phoneNumber, signUpMethod, ssoToken } =
      user;

    const signUpParams: DataModels.ISignUpParams = {
      email,
      password,
      signUpMethod,
      ssoToken,
      phoneNumber,
      username,
    };

    const result = await AuthenticationServices.signUp(signUpParams);

    if (!result?.success && result.error?.error) {
      const error = result.error.error;
      ToastHelpers.showToast({
        title: 'Error',
        content: error,
        type: 'error',
      });
    }

    if (result.success) {
      onSuccess?.();
    } else {
      onFail?.(result);
    }
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

      const result = await AuthenticationServices.signUp({
        email: user.email,
        signUpMethod: 'google',
        username: user.name,
        avatarUrl: user.photo,
        ssoToken: response.user.id,
      });

      if (result?.success) {
        const user = result.data.user as DataModels.IUser;

        await this.onSignInSuccess(user);

        this.setGoogleSigned(true);
      }
    }
  };

  appleSignIn = async () => {
    const response = await AuthenticationServices.appleSignin();

    if (response) {
      const body: DataModels.ISignUpParams = {
        email: response.email,
        signUpMethod: 'apple' as SignUpMethod,
        avatarUrl: null,
        ssoToken: response.user,
      };

      if (response.fullName?.givenName && response.fullName?.familyName) {
        body.username = `${response.fullName.givenName} ${response.fullName.familyName}`;
      }

      const result = await AuthenticationServices.signUp(body);

      if (result?.success) {
        const user = result.data.user as DataModels.IUser;

        await this.onSignInSuccess(user);

        this.setGoogleSigned(true);
      }
    }
  };

  googleSignOut = async () => {
    await AuthenticationServices.googleSignOut();
    this.setGoogleSigned(false);
  };

  appleSignOut = async () => {
    this.setAppleSigned(false);
    this.signOut();
  };

  facebookSignOut = async () => {
    await AuthenticationServices.facebookSignOut();
    this.setFacebookSigned(false);
  };

  facebookSignIn = async () => {
    const response = await AuthenticationServices.facebookSignIn();

    if (response?.status === 200) {
      const user = response.data;

      const result = await AuthenticationServices.signUp({
        email: user.email,
        signUpMethod: 'facebook',
        username: `${user.first_name} ${user.last_name}`,
        avatarUrl: user.picture?.data?.url,
        ssoToken: user.id,
      });

      if (result?.success) {
        const user = result.data.user as DataModels.IUser;

        await this.onSignInSuccess(user);

        this.setGoogleSigned(true);
      }
    }
  };

  fetchUser = async () => {
    const userId = await this.sharedStore.getStorageValue('userId');

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
