import { action, makeObservable, observable } from 'mobx';
import { AuthenticationServices } from '@services';

class AddCreditCardViewModel {
  cardNumber: string = '';
  cardHolder: string = '';
  expirationDate: string = '';

  constructor() {
    makeObservable(this, {
      expirationDate: observable,
      cardHolder: observable,
      cardNumber: observable,
      setExpirationDate: action,
      setCardHolder: action,
      setCardNumber: action,
    });
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
      // fetch user info
      console.log('result :>> ', result);
    }
  }
}

export { AddCreditCardViewModel };
