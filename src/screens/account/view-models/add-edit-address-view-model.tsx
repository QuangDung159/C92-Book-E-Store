import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class AddEditAddressViewModel {
  name: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  ward: string = '';
  primary: boolean = false;

  constructor(shippingAddress?: DataModels.IShippingAddress) {
    makeObservable(this, {
      name: observable,
      phoneNumber: observable,
      address: observable,
      city: observable,
      ward: observable,
      district: observable,
      primary: observable,
      setAddress: action,
      setCity: action,
      setWard: action,
      setDistrict: action,
      setPhoneNumber: action,
      setPrimary: action,
      setName: action,
      fromJsonObject: action,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
    }
  }

  fromJsonObject({
    name,
    phoneNumber,
    address,
    city,
    district,
    ward,
    primary,
  }: DataModels.IShippingAddress) {
    Object.assign(this, {
      name,
      phoneNumber,
      address,
      city,
      district,
      ward,
      primary,
    });
  }

  setName(value: string) {
    this.name = value;
  }

  setAddress(value: string) {
    this.address = value;
  }

  setCity(value: string) {
    this.city = value;
  }

  setDistrict(value: string) {
    this.district = value;
  }

  setWard(value: string) {
    this.ward = value;
  }

  setPhoneNumber(value: string) {
    this.phoneNumber = value;
  }

  setPrimary(value: boolean) {
    this.primary = value;
  }
}

export { AddEditAddressViewModel };
