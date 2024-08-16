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

    if (isAddNew) {
      runInAction(() => {
        this.userProfile = {
          ...this.userProfile,
          listShippingAddress: this.userProfile.listShippingAddress.concat(
            shippingAddressUpdated,
          ),
        };
      });
      return;
    }

    const list = ListHelpers.updateItemById(
      this.userProfile.listShippingAddress,
      shippingAddressUpdated,
    );

    runInAction(() => {
      this.userProfile = { ...this.userProfile, listShippingAddress: list };
    });
  };
}

export { UserStore };
