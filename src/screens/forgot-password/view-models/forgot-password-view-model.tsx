import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

class ForgotPasswordViewModel {
  email: string = '';
  code: string = '';
  shouldShowValidationErrors: boolean = false;

  constructor() {
    makeObservable(this, {
      email: observable,
      code: observable,
      shouldShowValidationErrors: observable,
      setEmail: action,
      setCode: action,
      validationErrors: computed,
      hasAnyValidationError: computed,
    });
  }

  setEmail(value: string) {
    this.email = value;
  }

  setCode(value: string) {
    this.code = value;
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.email) {
      errorMap.set('email', 'Please enter email');
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

export { ForgotPasswordViewModel };
