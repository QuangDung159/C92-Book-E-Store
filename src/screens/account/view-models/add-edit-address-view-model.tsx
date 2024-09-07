import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';

class AddEditAddressViewModel {
  name: string = '';
  phoneNumber: string = '';
  address: string = '';
  province: string = '';
  district: string = '';
  ward: string = '';
  primary: boolean = false;
  id: string = '';
  shippingAddress: DataModels.IShippingAddress | null = null;
  shouldShowValidationErrors: boolean = false;

  constructor(shippingAddress?: DataModels.IShippingAddress) {
    makeObservable(this, {
      name: observable,
      phoneNumber: observable,
      address: observable,
      province: observable,
      ward: observable,
      district: observable,
      primary: observable,
      setAddress: action,
      setProvince: action,
      setWard: action,
      setDistrict: action,
      setPhoneNumber: action,
      setPrimary: action,
      setName: action,
      fromJsonObject: action,
      toJsonObject: computed,

      // validation
      validationErrors: computed,
      hasAnyValidationError: computed,
      shouldShowValidationErrors: observable,
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
    province,
    district,
    ward,
    primary,
    id,
  }: DataModels.IShippingAddress) {
    Object.assign(this, {
      name,
      phoneNumber,
      address,
      province,
      district,
      ward,
      primary,
      id,
    });
  }

  get toJsonObject(): DataModels.IShippingAddress {
    return {
      address: this.address,
      province: this.province,
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

  setProvince(value: string) {
    this.province = value;
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

  // validation
  get validationErrors() {
    const errorMap: Map<string, string> = new Map();

    if (!this.name) {
      errorMap.set('name', 'Please contact name');
    }

    if (!this.address) {
      errorMap.set('address', 'Please enter address');
    }

    if (!this.phoneNumber) {
      errorMap.set('phoneNumber', 'Please enter phone number');
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

export { AddEditAddressViewModel };
