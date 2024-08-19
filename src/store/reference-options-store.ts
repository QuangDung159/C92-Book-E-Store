import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

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

  setAuthorDataSource(values: DataModels.IAuthor[]) {
    const listAuthor: DataModels.IReferenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    this.authorDataSource = listAuthor;
  }

  setFormDataSource(values: DataModels.IForm[]) {
    const listForm: DataModels.IReferenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    this.formDataSource = listForm;
  }

  setPublisherDataSource(values: DataModels.IPublisher[]) {
    const listPublisher: DataModels.IReferenceOptions[] = values.map(
      (item) => ({
        label: item.name,
        value: item.id,
      }),
    );

    this.publisherDataSource = listPublisher;
  }
}

export { ReferenceOptionsStore };
