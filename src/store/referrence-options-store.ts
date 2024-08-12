import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class ReferrenceOptionsStore {
  authorDataSource: DataModels.IReferenceOptions[] = [];
  formDataSource: DataModels.IReferenceOptions[] = [];
  publisherDataSource: DataModels.IReferenceOptions[] = [];

  constructor() {
    makeObservable(this, {
      authorDataSource: observable,
      formDataSource: observable,
      publisherDataSource: observable,
      setAuthorDataSource: action,
      setFormDataSource: action,
      setPublisherDataSource: action,
    });
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

  setPublisherDataSource(values: DataModels.IForm[]) {
    const listPublisher: DataModels.IReferenceOptions[] = values.map(
      (item) => ({
        label: item.name,
        value: item.id,
      }),
    );

    this.publisherDataSource = listPublisher;
  }
}

export { ReferrenceOptionsStore };
