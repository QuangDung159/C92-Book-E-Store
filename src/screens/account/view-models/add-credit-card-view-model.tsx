import { action, makeObservable, observable } from 'mobx';
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

  async addCreditCard(onSuccess?: () => void) {
    const result = await AuthenticationServices.createCreditCard(
      this.toJsonObject(),
    );

    if (result?.success) {
      onSuccess?.();
    }
  }

  async updateCreditCard(onSuccess?: () => void) {
    const result = await AuthenticationServices.updateCreditCard(
      this.toJsonObject(),
    );

    if (result?.success) {
      // await this.authenticationStore.fetchUser();
      onSuccess?.();
    }
  }
}

export { AddCreditCardViewModel };
