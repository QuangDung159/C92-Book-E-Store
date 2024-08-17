import { action, makeObservable, observable } from 'mobx';
import { USER } from '@constants';
import { UserStore } from '@store';
import { delay } from '@utils';

class SignInViewModel {
  email: string = '';
  password: string = '';
  userStore: UserStore | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      email: observable,
      password: observable,
      userStore: observable,
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

  login = async () => {
    await delay(1000);
    this.userStore.setUserProfile(USER);
  };
}

export { SignInViewModel };
