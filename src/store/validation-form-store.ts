import { computed, makeObservable, observable, runInAction } from 'mobx';
import { DataModels } from '@models';

class ValidationFormStore {
  shippingAddress: DataModels.IShippingAddress | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor() {
    makeObservable(this, {
      // validation
      validationErrors: computed,
      hasAnyValidationError: computed,
      shouldShowValidationErrors: observable,
    });
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

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

export { ValidationFormStore };
