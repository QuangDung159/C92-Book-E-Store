import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { UserStore } from '@store';

class SignUpViewModel {
  email: string = '';
  password: string = '';
  username: string = '';
  phoneNumber: string = '';
  confirmPassword: string = '';
  userStore: UserStore | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      email: observable,
      password: observable,
      username: observable,
      phoneNumber: observable,
      confirmPassword: observable,
      userStore: observable,
      shouldShowValidationErrors: observable,
      setConfirmPassword: action,
      setPhoneNumber: action,
      setUsername: action,
      setEmail: action,
      setPassword: action,
      validationErrors: computed,
      hasAnyValidationError: computed,
      toJsonObject: computed,
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

  get toJsonObject(): DataModels.IUser {
    return {
      ...this.userStore.userProfile,
      username: this.username,
      password: this.password,
      phoneNumber: this.password,
      email: this.email,
    };
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.username) {
      errorMap.set('username', 'Please enter username');
    }

    if (!this.password) {
      errorMap.set('password', 'Please enter password');
    }

    if (!this.phoneNumber) {
      errorMap.set('phoneNumber', 'Please enter phone number');
    }

    if (!this.email) {
      errorMap.set('email', 'Please enter email');
    }

    if (!this.confirmPassword) {
      errorMap.set('confirmPassword', 'Please enter confirm password');
    }

    if (this.confirmPassword !== this.password) {
      errorMap.set('confirmPassword', 'Confirm password not match');
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

export { SignUpViewModel };
