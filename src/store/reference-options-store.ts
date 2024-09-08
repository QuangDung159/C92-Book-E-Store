import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ReferenceOptionServices } from '@services';
import { AdministrativeUnitEnum } from '@types';

class ReferenceOptionsStore {
  authorDataSource: DataModels.IReferenceOptions[] = [];
  formDataSource: DataModels.IReferenceOptions[] = [];
  publisherDataSource: DataModels.IReferenceOptions[] = [];
  provinceDataSource: DataModels.IReferenceOptions[] = [];
  districtDataSource: DataModels.IReferenceOptions[] = [];
  wardDataSource: DataModels.IReferenceOptions[] = [];

  constructor() {
    makeObservable(this, {
      authorDataSource: observable,
      formDataSource: observable,
      publisherDataSource: observable,
      districtDataSource: observable,
      wardDataSource: observable,
      provinceDataSource: observable,
      setProvinceDataSource: action,
      setDistrictDataSource: action,
      setWardDataSource: action,
      setAuthorDataSource: action,
      setFormDataSource: action,
      setPublisherDataSource: action,
    });
  }

  setProvinceDataSource(values: DataModels.IReferenceOptions[]) {
    this.provinceDataSource = values;
  }

  setDistrictDataSource(values: DataModels.IReferenceOptions[]) {
    this.districtDataSource = values;
  }

  setWardDataSource(values: DataModels.IReferenceOptions[]) {
    this.wardDataSource = values;
  }

  setAuthorDataSource(values: DataModels.IReferenceOptions[]) {
    this.authorDataSource = values;
  }

  setFormDataSource(values: DataModels.IReferenceOptions[]) {
    this.formDataSource = values;
  }

  setPublisherDataSource(values: DataModels.IReferenceOptions[]) {
    this.publisherDataSource = values;
  }

  async fetchListAuthor() {
    const result = await ReferenceOptionServices.fetchListAuthor();
    if (result && result.success) {
      const dataSource: DataModels.IReferenceOptions[] = (
        result.data?.list || []
      ).map(
        (item: any) =>
          ({
            label: item.name,
            value: item._id,
          }) as DataModels.IReferenceOptions,
      );

      this.setAuthorDataSource(dataSource);
    }
  }

  async fetchListPublisher() {
    const result = await ReferenceOptionServices.fetchListPublisher();
    if (result && result.success) {
      const dataSource: DataModels.IReferenceOptions[] = (
        result.data?.list || []
      ).map(
        (item: any) =>
          ({
            label: item.name,
            value: item._id,
          }) as DataModels.IReferenceOptions,
      );

      this.setPublisherDataSource(dataSource);
    }
  }

  async fetchListForm() {
    const result = await ReferenceOptionServices.fetchListForm();
    if (result && result.success) {
      const dataSource: DataModels.IReferenceOptions[] = (
        result.data?.list || []
      ).map(
        (item: any) =>
          ({
            label: item.name,
            value: item._id,
          }) as DataModels.IReferenceOptions,
      );

      this.setFormDataSource(dataSource);
    }
  }

  async fetchListAdministrative(level: AdministrativeUnitEnum) {
    const result = await ReferenceOptionServices.fetchListAdministrative(level);
    if (result && result.success) {
      const dataSource: DataModels.IReferenceOptions[] = (
        result.data?.list || []
      ).map(
        (item: any) =>
          ({
            label: item.name,
            value: item._id,
            extraData: {
              parent: item.parent,
            },
          }) as DataModels.IReferenceOptions,
      );

      if (level === 'province') {
        this.setProvinceDataSource(dataSource);
      }

      if (level === 'district') {
        this.setDistrictDataSource(dataSource);
      }

      if (level === 'ward') {
        this.setWardDataSource(dataSource);
      }
    }
  }

  getItemByValue = (
    value: string,
    dataSource: DataModels.IReferenceOptions[],
  ) => {
    const item = dataSource.find((i) => i.value === value);
    return item || null;
  };
}

export { ReferenceOptionsStore };
