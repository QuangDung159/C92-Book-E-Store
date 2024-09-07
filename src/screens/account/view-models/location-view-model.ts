import { action, computed, makeObservable, observable } from 'mobx';
import { ADMINISTRATIVE } from '@constants';
import { DataModels } from '@models';
import { ReferenceOptionsStore } from '@store';
import { AdministrativeUnitEnum } from '@types';

class LocationViewModel {
  province: string = ADMINISTRATIVE.province;
  district: string = ADMINISTRATIVE.district;
  ward: string = ADMINISTRATIVE.ward;
  referenceOptionsStore: ReferenceOptionsStore = null;
  administrativeSelected: AdministrativeUnitEnum = 'province';

  constructor(
    referenceOptionsStore: ReferenceOptionsStore,
    shippingAddress?: DataModels.IShippingAddress,
  ) {
    makeObservable(this, {
      province: observable,
      ward: observable,
      district: observable,
      administrativeSelected: observable,
      setAdministrativeSelected: action,
      setProvince: action,
      setWard: action,
      setDistrict: action,
      fromJsonObject: action,
      onReset: action,
      districtDataSource: computed,
      wardDataSource: computed,
      selectedAdministrativeValue: computed,
      administrativeDataSource: computed,
      isCanSubmit: computed,
    });

    if (shippingAddress) {
      this.fromJsonObject(shippingAddress);
    }

    if (referenceOptionsStore) {
      this.referenceOptionsStore = referenceOptionsStore;
    }
  }

  setAdministrativeSelected(value: AdministrativeUnitEnum) {
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
      (item) => item.extraData.parent === this.province,
    );

    return list;
  }

  getlabelSelected(administrative: AdministrativeUnitEnum) {
    switch (administrative) {
      case 'province':
        return this.province;
      case 'district':
        return this.district;
      default:
        return this.ward;
    }
  }

  get selectedAdministrativeValue() {
    switch (this.administrativeSelected) {
      case 'province':
        return this.province;
      case 'district':
        return this.district;
      default:
        return this.ward;
    }
  }

  get administrativeDataSource() {
    console.log(
      'this.referenceOptionsStore.provinceDataSource :>> ',
      this.referenceOptionsStore.provinceDataSource,
    );
    switch (this.administrativeSelected) {
      case 'province':
        return this.referenceOptionsStore.provinceDataSource;
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

  setProvince(value: string) {
    if (this.province === value) {
      return;
    }

    this.province = value;
    this.district = ADMINISTRATIVE.district;
    this.ward = ADMINISTRATIVE.ward;

    this.setAdministrativeSelected('district');
  }

  setDistrict(value: string) {
    if (this.district === value) {
      return;
    }

    this.district = value;
    this.ward = ADMINISTRATIVE.ward;

    this.setAdministrativeSelected('ward');
  }

  onReset = () => {
    this.setProvince(ADMINISTRATIVE.province);
    this.setDistrict(ADMINISTRATIVE.district);
    this.setWard(ADMINISTRATIVE.ward);

    this.setAdministrativeSelected('province');
  };

  setWard(value: string) {
    this.ward = value;
  }

  onSelectedAdministrativeItem = (value: string) => {
    switch (this.administrativeSelected) {
      case 'province':
        this.setProvince(value);
        break;
      case 'district':
        this.setDistrict(value);
        break;
      default:
        this.setWard(value);
        break;
    }
  };

  get isCanSubmit() {
    return (
      this.province !== ADMINISTRATIVE.province &&
      this.district !== ADMINISTRATIVE.district &&
      this.ward !== ADMINISTRATIVE.ward
    );
  }
}

export { LocationViewModel };
