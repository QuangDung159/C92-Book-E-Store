import { action, computed, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ReferenceOptionsStore } from '@store';
import { AdministrativeUnit } from '@types';

class LocationViewModel {
  city: string = '';
  district: string = '';
  ward: string = '';
  referenceOptionsStore: ReferenceOptionsStore = null;
  administrativeSelected: AdministrativeUnit = 'city';

  constructor(
    referenceOptionsStore: ReferenceOptionsStore,
    shippingAddress?: DataModels.IShippingAddress,
  ) {
    makeObservable(this, {
      city: observable,
      ward: observable,
      district: observable,
      administrativeSelected: observable,
      setAdministrativeSelected: action,
      setCity: action,
      setWard: action,
      setDistrict: action,
      fromJsonObject: action,
      districtDataSource: computed,
      wardDataSource: computed,
      labelSelected: computed,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
    }

    if (referenceOptionsStore) {
      this.referenceOptionsStore = referenceOptionsStore;
    }
  }

  setAdministrativeSelected(value: AdministrativeUnit) {
    this.administrativeSelected = value;
  }

  fromJsonObject({ city, district, ward }: DataModels.IShippingAddress) {
    Object.assign(this, {
      city,
      district,
      ward,
    });
  }

  get districtDataSource() {
    const list = this.referenceOptionsStore.districtDataSource.filter(
      (item) => item.extraData.parent === this.city,
    );

    return list;
  }

  get labelSelected() {
    switch (this.administrativeSelected) {
      case 'city':
        return this.city;
      case 'district':
        return this.district;
      default:
        return this.ward;
    }
  }

  get wardDataSource() {
    const list = this.referenceOptionsStore.wardDataSource.filter(
      (item) => item.extraData.parent === this.district,
    );

    return list;
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
}

export { LocationViewModel };
