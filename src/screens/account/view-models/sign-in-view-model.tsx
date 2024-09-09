import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { UserStore } from '@store';
import { delay } from '@utils';

class SignInViewModel {
  username: string = '';
  password: string = '';
  userStore: UserStore | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      username: observable,
      password: observable,
      userStore: observable,
      shouldShowValidationErrors: observable,
      setUsername: action,
      setPassword: action,
      validationErrors: computed,
      hasAnyValidationError: computed,
    });

    this.userStore = userStore;
  }

  setUsername(value: string) {
    this.username = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  login = async () => {
    await delay(1000);
    this.userStore.setUserProfile(this.userStore.userProfile);
  };

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.username) {
      errorMap.set('username', 'Please enter username');
    }

    if (!this.password) {
      errorMap.set('password', 'Please enter password');
    }
    return errorMap;
  }

  showValidationErrors(value: boolean) {
    runInAction(() => {
      this.shouldShowValidationErrors = value;
    });
  }

  get hasAnyValidationError() {
    return this.validationErrors.size > 0;
  }
}

export { SignInViewModel };
