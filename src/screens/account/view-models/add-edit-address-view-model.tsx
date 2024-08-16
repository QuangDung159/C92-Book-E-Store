import { action, computed, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class AddEditAddressViewModel {
  name: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  ward: string = '';
  primary: boolean = false;
  id: string = '';
  shippingAddress: DataModels.IShippingAddress | null = null;

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
      toJsonObject: computed,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
      this.shippingAddress = shippingAddress;
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
    id,
  }: DataModels.IShippingAddress) {
    Object.assign(this, {
      name,
      phoneNumber,
      address,
      city,
      district,
      ward,
      primary,
      id,
    });
  }

  get toJsonObject(): DataModels.IShippingAddress {
    return {
      address: this.address,
      city: this.city,
      district: this.district,
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      primary: this.primary,
      shippingFee: this.shippingAddress?.shippingFee || 0,
      ward: this.ward,
    };
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
