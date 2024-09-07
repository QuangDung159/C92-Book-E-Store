import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { OrderServices } from '@services';
import { OrderStatus } from '@types';
import { delay, ListHelpers } from '@utils';

class UserStore {
  userProfile: DataModels.IUser | null = null;
  listCompletedOrder: DataModels.IOrder[] = [];
  listCanceledOrder: DataModels.IOrder[] = [];
  listProcessingOrder: DataModels.IOrder[] = [];
  listCreatedOrder: DataModels.IOrder[] = [];

  constructor() {
    makeObservable(this, {
      userProfile: observable,
      listCompletedOrder: observable,
      listCanceledOrder: observable,
      listProcessingOrder: observable,
      listCreatedOrder: observable,
      setListCreatedOrder: action,
      setListCompletedOrder: action,
      setListCanceledOrder: action,
      setListProcessingOrder: action,
      setUserProfile: action,
      authenticated: computed,
    });
  }

  setListCreatedOrder(values: DataModels.IOrder[]) {
    this.listCreatedOrder = values;
  }

  setListCompletedOrder(values: DataModels.IOrder[]) {
    this.listCompletedOrder = values;
  }

  setListCanceledOrder(values: DataModels.IOrder[]) {
    this.listCanceledOrder = values;
  }

  setListProcessingOrder(values: DataModels.IOrder[]) {
    this.listProcessingOrder = values;
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
        ...(this.userProfile.listShippingAddress || []),
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

  get authenticated() {
    return Boolean(this.userProfile);
  }

  fetchListOrder = async (status: OrderStatus) => {
    if (this.authenticated) {
      const result = await OrderServices.fetchListOrder({
        userId: this.userProfile.id,
        orderStatus: status,
      });

      if (result?.success && result.data) {
        const listOrder = result.data.listOrder || [];
        if (status === 'canceled') {
          this.setListCanceledOrder(listOrder);
        }

        if (status === 'completed') {
          this.setListCompletedOrder(listOrder);
        }

        if (status === 'canceled') {
          this.setListCanceledOrder(listOrder);
        }

        this.setListCreatedOrder(listOrder);
      }
    }
  };
}

export { UserStore };
