import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class AddEditAddressViewModel {
  name: string = '';
  phoneNumber: string = '';

  constructor(shippingAddress?: DataModels.IShippingAddress) {
    makeObservable(this, {
      name: observable,
      phoneNumber: observable,
      setPhoneNumber: action,
      setName: action,
      fromJsonObject: action,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
    }
  }

  fromJsonObject({ name, phoneNumber }: DataModels.IShippingAddress) {
    Object.assign(this, { name, phoneNumber });
  }

  setName(value: string) {
    this.name = value;
  }

  setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }
}

export { AddEditAddressViewModel };
