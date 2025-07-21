import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { AuthenticationStore } from '@store';

class AddCreditCardViewModel {
  cardNumber: string = '';
  cardHolder: string = '';
  expirationDate: string = '';
  primary: boolean = false;
  authenticationStore: AuthenticationStore | null = null;
  id: string = '';
  shouldShowValidationErrors: boolean = false;

  constructor(
    authenticationStore: AuthenticationStore,
    creditCard?: DataModels.ICreditCard,
  ) {
    makeObservable(this, {
      expirationDate: observable,
      authenticationStore: observable,
      cardHolder: observable,
      cardNumber: observable,
      primary: observable,
      id: observable,
      setPrimary: action,
      setExpirationDate: action,
      setCardHolder: action,
      setCardNumber: action,

      // validation
      validationErrors: computed,
      hasAnyValidationError: computed,
      shouldShowValidationErrors: observable,
    });

    this.authenticationStore = authenticationStore;

    if (creditCard) {
      this.expirationDate = creditCard.expirationDate;
      this.cardHolder = creditCard.cardHolder;
      this.cardNumber = creditCard.cardNumber;
      this.primary = creditCard.primary;
      this.id = creditCard.id;
    }
  }

  setExpirationDate(value: string) {
    this.expirationDate = value;
  }

  setCardHolder(value: string) {
    this.cardHolder = value;
  }

  setCardNumber(value: string) {
    this.cardNumber = value;
  }

  setPrimary(value: boolean) {
    this.primary = value;
  }

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.cardNumber) {
      errorMap.set('cardNumber', 'Please enter card number');
    }

    if (!this.cardHolder) {
      errorMap.set('cardHolder', 'Please enter card holder');
    }

    if (!this.expirationDate) {
      errorMap.set('expirationDate', 'Please enter expiration date');
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

  toJsonObject = () => {
    return {
      cardHolder: this.cardHolder,
      cardNumber: this.cardNumber,
      cardType: 'master-card',
      expirationDate: this.expirationDate,
      primary: this.primary,
      id: this.id,
      user: this.authenticationStore.userStore.userProfile.id,
    } as DataModels.ICreditCardParams;
  };

  async addCreditCard(onSuccess?: (data: any) => void) {
    const result = await AuthenticationServices.createCreditCard(
      this.toJsonObject(),
    );

    if (result?.success) {
      onSuccess?.(result.data?.creditCard);
    }
  }

  async updateCreditCard(onSuccess?: () => void) {
    const result = await AuthenticationServices.updateCreditCard(
      this.toJsonObject(),
    );

    if (result?.success) {
      onSuccess?.();
    }
  }

  async deleteCard(onSuccess?: () => void) {
    const result = await AuthenticationServices.deleteCreditCard(this.id);

    if (result?.success) {
      onSuccess?.();
    }
  }
}

export { AddCreditCardViewModel };
