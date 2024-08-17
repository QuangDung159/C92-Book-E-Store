import { action, makeObservable, observable, runInAction } from 'mobx';
import { USER } from '@constants';
import { UserStore } from '@store';
import { delay } from '@utils';

class SignInViewModel {
  email: string = '';
  password: string = '';
  username: string = '';
  phoneNumber: string = '';
  confirmPassword: string = '';
  userStore: UserStore | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      email: observable,
      password: observable,
      username: observable,
      phoneNumber: observable,
      confirmPassword: observable,
      setConfirmPassword: action,
      setPhoneNumber: action,
      setUsername: action,
      setEmail: action,
      setPassword: action,
    });

    this.userStore = userStore;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  setConfirmPassword(value: string) {
    this.confirmPassword = value;
  }

  setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  setUsername(value: string) {
    this.username = value;
  }

  signUp() {
    runInAction(() => {
      delay(1000).then(() => {
        this.userStore.setUserProfile(USER);
      });
    });
  }
}

export { SignInViewModel };
