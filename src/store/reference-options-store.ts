import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ReferenceOptionServices } from '@services';

class ReferenceOptionsStore {
  authorDataSource: DataModels.IReferenceOptions[] = [];
  formDataSource: DataModels.IReferenceOptions[] = [];
  publisherDataSource: DataModels.IReferenceOptions[] = [];
  cityDataSource: DataModels.IReferenceOptions[] = [];
  districtDataSource: DataModels.IReferenceOptions[] = [];
  wardDataSource: DataModels.IReferenceOptions[] = [];

  constructor() {
    makeObservable(this, {
      authorDataSource: observable,
      formDataSource: observable,
      publisherDataSource: observable,
      cityDataSource: observable,
      districtDataSource: observable,
      wardDataSource: observable,
      setCityDataSource: action,
      setDistrictDataSource: action,
      setWardDataSource: action,
      setAuthorDataSource: action,
      setFormDataSource: action,
      setPublisherDataSource: action,
    });
  }

  setCityDataSource(values: DataModels.ILocation[]) {
    const listCity: DataModels.IReferenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.name,
      extraData: {
        parent: item.parent,
      },
    }));

    this.cityDataSource = listCity;
  }

  setDistrictDataSource(values: DataModels.ILocation[]) {
    const listDistrict: DataModels.IReferenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.name,
      extraData: {
        parent: item.parent,
      },
    }));

    this.districtDataSource = listDistrict;
  }

  setWardDataSource(values: DataModels.ILocation[]) {
    const listWard: DataModels.IReferenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.name,
      extraData: {
        parent: item.parent,
      },
    }));

    this.wardDataSource = listWard;
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
}

export { ReferenceOptionsStore };
