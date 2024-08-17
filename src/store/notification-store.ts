import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { NotificationServices } from '@services';

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

  loadNotification = async () => {
    runInAction(() => {
      NotificationServices.loadListNotification().then((value) => {
        this.setListNotification(value);
      });
    });
  };
}

export { NotificationStore };
