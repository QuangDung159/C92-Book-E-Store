import { action, makeObservable, observable } from 'mobx';
import { AuthenticationServices } from '@services';
import { AuthenticationStore } from '@store';

class AddCreditCardViewModel {
  cardNumber: string = '';
  cardHolder: string = '';
  expirationDate: string = '';
  authenticationStore: AuthenticationStore | null = null;

  constructor(authenticationStore: AuthenticationStore) {
    makeObservable(this, {
      expirationDate: observable,
      authenticationStore: observable,
      cardHolder: observable,
      cardNumber: observable,
      setExpirationDate: action,
      setCardHolder: action,
      setCardNumber: action,
    });

    this.authenticationStore = authenticationStore;
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
