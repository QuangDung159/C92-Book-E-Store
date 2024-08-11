import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class ReferrenceOptionsStore {
  authorDataSource: DataModels.IReferrenceOptions[] = [];
  formDataSource: DataModels.IReferrenceOptions[] = [];

  constructor() {
    makeObservable(this, {
      authorDataSource: observable,
      formDataSource: observable,
      setAuthorDataSource: action,
      setFormDataSource: action,
    });
  }

  setAuthorDataSource(values: DataModels.IAuthor[]) {
    const listAuthor: DataModels.IReferrenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    this.authorDataSource = listAuthor;
  }

  setFormDataSource(values: DataModels.IForm[]) {
    const listForm: DataModels.IReferrenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    this.formDataSource = listForm;
  }
}

export { ReferrenceOptionsStore };
