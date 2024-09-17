import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { UserServices } from '@services';
import { UserStore } from '@store';

class EditAccountViewModel {
  currentPassword: string = '';
  password: string = '';
  phoneNumber: string = '';
  confirmPassword: string = '';
  userStore: UserStore | null = null;
  shouldShowValidationErrors: boolean = false;
  showChangePassword: boolean = false;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      password: observable,
      phoneNumber: observable,
      confirmPassword: observable,
      userStore: observable,
      shouldShowValidationErrors: observable,
      currentPassword: observable,
      showChangePassword: observable,
      setShowChangePassword: action,
      setCurrentPassword: action,
      setConfirmPassword: action,
      setPhoneNumber: action,
      setPassword: action,
      validationErrors: computed,
      hasAnyValidationError: computed,
      toJsonObject: computed,
    });

    this.userStore = userStore;
    this.phoneNumber = userStore.userProfile.phoneNumber;
  }

  setShowChangePassword(value: boolean) {
    this.showChangePassword = value;
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
      ...this.userStore.userProfile,
      password: this.password,
      phoneNumber: this.phoneNumber,
    };
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.phoneNumber) {
      errorMap.set('phoneNumber', 'Please enter phone number');
    }

    if (this.showChangePassword) {
      if (!this.password) {
        errorMap.set('password', 'Please enter password');
      }

      if (!this.confirmPassword) {
        errorMap.set('confirmPassword', 'Please enter confirm password');
      }

      if (this.confirmPassword !== this.password) {
        errorMap.set('confirmPassword', 'Confirm password not match');
      }

      if (this.currentPassword !== this.userStore.userProfile?.password) {
        errorMap.set('currentPassword', 'Current password wrong');
      }
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

  submitUpdate = async () => {
    const result = await UserServices.updateUser(this.toJsonObject);

    if (result?.success && result.data) {
      this.userStore.setUserProfile(result.data.user);
    }
  };
}

export { EditAccountViewModel };
