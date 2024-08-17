import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { USER } from '@constants';
import { DataModels } from '@models';
import { UserStore } from '@store';
import { delay } from '@utils';

class SignInViewModel {
  email: string = '';
  password: string = '';
  userStore: UserStore | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      email: observable,
      password: observable,
      userStore: observable,
      shouldShowValidationErrors: observable,
      setEmail: action,
      setPassword: action,
      toJsonObject: computed,
      validationErrors: computed,
      hasAnyValidationError: computed,
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

  get toJsonObject(): DataModels.IUser {
    return {
      email: this.email,
      listCreditCard: USER.listCreditCard,
      listShippingAddress: USER.listShippingAddress,
      username: USER.username,
    };
  }

  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.email) {
      errorMap.set('email', 'Please enter email');
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
