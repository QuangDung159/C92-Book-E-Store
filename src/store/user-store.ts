import { action, makeObservable, observable, runInAction } from 'mobx';
import { DataModels } from '@models';
import { delay, ListHelpers } from '@utils';

class UserStore {
  userProfile: DataModels.IUser | null = null;

  constructor() {
    makeObservable(this, {
      userProfile: observable,
      setUserProfile: action,
    });
  }

  setUserProfile(value: DataModels.IUser) {
    this.userProfile = value;
  }

  updateListShippingAddress = async (
    shippingAddressUpdated: DataModels.IShippingAddress,
    isAddNew?: boolean,
  ) => {
    await delay(1000);

    runInAction(() => {
      let list: DataModels.IShippingAddress[] = [
        ...this.userProfile.listShippingAddress,
      ];

      if (isAddNew) {
        list.unshift(shippingAddressUpdated);
      } else {
        list = ListHelpers.updateItemById(
          this.userProfile.listShippingAddress,
          shippingAddressUpdated,
        );
      }

      if (shippingAddressUpdated.primary) {
        list.forEach((item) => {
          if (item.id !== shippingAddressUpdated.id) {
            item.primary = false;
          }
        });
      }
      this.userProfile = { ...this.userProfile, listShippingAddress: list };
    });
  };
}

export { UserStore };
