import { action, computed, makeObservable, observable } from 'mobx';
import { ADMINISTRATIVE } from '@constants';
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
      onReset: action,
      districtDataSource: computed,
      wardDataSource: computed,
      selectedAdministrativeValue: computed,
      administrativeDataSource: computed,
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

  getlabelSelected(administrative: AdministrativeUnit) {
    switch (administrative) {
      case 'city':
        return this.city;
      case 'district':
        return this.district;
      default:
        return this.ward;
    }
  }

  get selectedAdministrativeValue() {
    switch (this.administrativeSelected) {
      case 'city':
        return this.city;
      case 'district':
        return this.district;
      default:
        return this.ward;
    }
  }

  get administrativeDataSource() {
    switch (this.administrativeSelected) {
      case 'city':
        return this.referenceOptionsStore.cityDataSource;
      case 'district':
        return this.districtDataSource;
      default:
        return this.wardDataSource;
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
    this.district = ADMINISTRATIVE.district;
    this.ward = ADMINISTRATIVE.ward;
  }

  setDistrict(value: string) {
    this.district = value;
    this.ward = ADMINISTRATIVE.ward;
  }

  onReset = () => {
    this.setCity(ADMINISTRATIVE.city);
    this.setDistrict(ADMINISTRATIVE.district);
    this.setWard(ADMINISTRATIVE.ward);
  };

  setWard(value: string) {
    this.ward = value;
  }

  onSelectedAdministrativeItem = (value: string) => {
    switch (this.administrativeSelected) {
      case 'city':
        this.setCity(value);
        break;
      case 'district':
        this.setDistrict(value);
        break;
      default:
        this.setWard(value);
        break;
    }
  };
}

export { LocationViewModel };
