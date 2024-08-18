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

class EditAccountViewModel {
  currentPassword: string = '';
  password: string = '';
  phoneNumber: string = '';
  confirmPassword: string = '';
  userStore: UserStore | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      password: observable,
      phoneNumber: observable,
      confirmPassword: observable,
      userStore: observable,
      shouldShowValidationErrors: observable,
      currentPassword: observable,
      setCurrentPassword: action,
      setConfirmPassword: action,
      setPhoneNumber: action,
      setPassword: action,
      validationErrors: computed,
      hasAnyValidationError: computed,
      toJsonObject: computed,
    });

    this.userStore = userStore;
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

  setCurrentPassword(value: string) {
    this.currentPassword = value;
  }

  get toJsonObject(): DataModels.IUser {
    return {
      ...USER,
      password: this.password,
      phoneNumber: this.password,
    };
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.password) {
      errorMap.set('password', 'Please enter password');
    }

    if (!this.phoneNumber) {
      errorMap.set('phoneNumber', 'Please enter phone number');
    }

    if (!this.confirmPassword) {
      errorMap.set('confirmPassword', 'Please enter confirm password');
    }

    if (this.confirmPassword !== this.password) {
      errorMap.set('confirmPassword', 'Confirm password not match');
    }

    console.log(
      'this.userStore.userProfile?.password :>> ',
      this.userStore.userProfile?.password,
    );

    if (this.currentPassword !== this.userStore.userProfile?.password) {
      errorMap.set('currentPassword', 'Current password wrong');
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

export { EditAccountViewModel };
