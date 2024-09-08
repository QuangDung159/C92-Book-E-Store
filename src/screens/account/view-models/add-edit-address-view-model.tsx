import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { UserServices } from '@services';
import { authenticationStore, ReferenceOptionsStore } from '@store';
import { ListHelpers } from '@utils';

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
  referenceOptionsStore: ReferenceOptionsStore | null = null;

  constructor(
    shippingAddress?: DataModels.IShippingAddress,
    referenceOptionsStore?: ReferenceOptionsStore,
  ) {
    makeObservable(this, {
      name: observable,
      phoneNumber: observable,
      address: observable,
      province: observable,
      ward: observable,
      district: observable,
      primary: observable,
      referenceOptionsStore: observable,
      setAddress: action,
      setProvince: action,
      setWard: action,
      setDistrict: action,
      setPhoneNumber: action,
      setPrimary: action,
      setName: action,
      fromJsonObject: action,
      toJsonObject: computed,
      provinceFromSource: computed,
      districtFromSource: computed,
      wardFromSource: computed,

      // validation
      validationErrors: computed,
      hasAnyValidationError: computed,
      shouldShowValidationErrors: observable,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
      this.shippingAddress = shippingAddress;
    }

    if (referenceOptionsStore) {
      this.referenceOptionsStore = referenceOptionsStore;
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

  get provinceFromSource() {
    return ListHelpers.getItemByField(
      this.referenceOptionsStore.provinceDataSource,
      this.province,
      'value',
    )?.data as DataModels.IReferenceOptions;
  }

  get districtFromSource() {
    return ListHelpers.getItemByField(
      this.referenceOptionsStore.districtDataSource,
      this.district,
      'value',
    )?.data as DataModels.IReferenceOptions;
  }

  get wardFromSource() {
    return ListHelpers.getItemByField(
      this.referenceOptionsStore.wardDataSource,
      this.ward,
      'value',
    )?.data as DataModels.IReferenceOptions;
  }

  createShippingAddress = async (userId: string) => {
    const result = await UserServices.createShippingAddress(
      this.toJsonObject,
      userId,
    );

    if (result?.success && result.data) {
      authenticationStore.fetchUser();
    }

    return result?.success;
  };
}

export { AddEditAddressViewModel };
