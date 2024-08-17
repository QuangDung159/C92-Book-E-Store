import { action, computed, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class NotificationStore {
  categorySelected: DataModels.ICategory | null = null;
  listNotification: DataModels.INotification[] = [];

  constructor() {
    makeObservable(this, {
      listNotification: observable,
      setListNotification: action,
      unReadNotification: computed,
    });
  }

  setListNotification(values: DataModels.INotification[]) {
    this.listNotification = values;
  }

  get unReadNotification() {
    return this.listNotification.filter((item) => !item.readed);
  }
}

export { NotificationStore };
