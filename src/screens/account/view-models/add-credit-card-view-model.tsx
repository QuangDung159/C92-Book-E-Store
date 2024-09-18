import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { AuthenticationServices } from '@services';
import { AuthenticationStore } from '@store';

class AddCreditCardViewModel {
  cardNumber: string = '';
  cardHolder: string = '';
  expirationDate: string = '';
  default: boolean = false;
  authenticationStore: AuthenticationStore | null = null;

  constructor(
    authenticationStore: AuthenticationStore,
    creditCard?: DataModels.ICreditCard,
  ) {
    makeObservable(this, {
      expirationDate: observable,
      authenticationStore: observable,
      cardHolder: observable,
      cardNumber: observable,
      default: observable,
      setDefault: action,
      setExpirationDate: action,
      setCardHolder: action,
      setCardNumber: action,
    });

    this.authenticationStore = authenticationStore;

    if (creditCard) {
      this.expirationDate = creditCard.expirationDate;
      this.cardHolder = creditCard.cardHolder;
      this.cardNumber = creditCard.cardNumber;
      this.default = creditCard.default;
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

  setDefault(value: boolean) {
    this.default = value;
  }

  async addCreditCard(userId: string) {
    const result = await AuthenticationServices.createCreditCard({
      cardHolder: this.cardHolder,
      cardNumber: this.cardNumber,
      cardType: 'master-card',
      expirationDate: this.expirationDate,
      user: userId,
    });

    if (result?.success) {
      await this.authenticationStore.fetchUser();
    }
  }
}

export { AddCreditCardViewModel };
