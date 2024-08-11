import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class ReferrenceOptionsStore {
  authorDataSource: DataModels.IReferrenceOptions[] = [];

  constructor() {
    makeObservable(this, {
      authorDataSource: observable,
      setAuthorDataSource: action,
    });
  }

  setAuthorDataSource(values: DataModels.IAuthor[]) {
    const listAuthor: DataModels.IReferrenceOptions[] = values.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    this.authorDataSource = listAuthor;
  }
}

export { ReferrenceOptionsStore };
