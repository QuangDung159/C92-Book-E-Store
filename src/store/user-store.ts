import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { BookServices, OrderServices, UserServices } from '@services';
import { OrderStatus } from '@types';
import { delay, ListHelpers } from '@utils';
import { ReferenceOptionsStore } from './reference-options-store';

class UserStore {
  userProfile: DataModels.IUser | null = null;
  listCompletedOrder: DataModels.IOrder[] = [];
  listCanceledOrder: DataModels.IOrder[] = [];
  listProcessingOrder: DataModels.IOrder[] = [];
  listCreatedOrder: DataModels.IOrder[] = [];
  referenceOptionsStore: ReferenceOptionsStore | null = null;
  listFavorite?: DataModels.IBook[] = [];
  listViewed?: DataModels.IBook[] = [];

  constructor(referenceOptionsStore: ReferenceOptionsStore) {
    makeObservable(this, {
      userProfile: observable,
      listCompletedOrder: observable,
      listCanceledOrder: observable,
      listProcessingOrder: observable,
      listCreatedOrder: observable,
      referenceOptionsStore: observable,
      listFavorite: observable,
      listViewed: observable,
      setListViewed: action,
      setListFavorite: action,
      setListCreatedOrder: action,
      setListCompletedOrder: action,
      setListCanceledOrder: action,
      setListProcessingOrder: action,
      setUserProfile: action,
      authenticated: computed,
    });

    if (referenceOptionsStore) {
      this.referenceOptionsStore = referenceOptionsStore;
    }
  }

  setListFavorite(values: DataModels.IBook[]) {
    this.listFavorite = values;
  }

  setListViewed(values: DataModels.IBook[]) {
    this.listViewed = values;
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
        if (status === 'created') {
          this.setListCreatedOrder(listOrder);
        }

        if (status === 'completed') {
          this.setListCompletedOrder(listOrder);
        }

        if (status === 'canceled') {
          this.setListCanceledOrder(listOrder);
        }

        if (status === 'processing') {
          this.setListProcessingOrder(listOrder);
        }
      }
    }
  };

  getFullAddress = (address: DataModels.IShippingAddress) => {
    return `${address.address}, ${this.getShortAddress(address)}`;
  };

  getShortAddress = (address: DataModels.IShippingAddress) => {
    const ward = ListHelpers.getItemByField(
      this.referenceOptionsStore.wardDataSource,
      address.ward,
      'value',
    )?.data?.label;

    const province = ListHelpers.getItemByField(
      this.referenceOptionsStore.provinceDataSource,
      address.province,
      'value',
    )?.data?.label;

    const district = ListHelpers.getItemByField(
      this.referenceOptionsStore.districtDataSource,
      address.district,
      'value',
    )?.data?.label;

    return `${ward}, ${district}, ${province}`;
  };

  deleteShippingAddress = async (addressId: string) => {
    const result = await UserServices.deleteShippingAddress(addressId);

    return result?.success;
  };

  fetchListInAccountView = async (type: 'viewed' | 'favorite') => {
    let result: DataModels.ServiceResult<any> = null;

    if (this.authenticated) {
      if (type === 'favorite') {
        result = await BookServices.fetchListByListId({
          listId: this.userProfile.listBookLiked || [],
        });
      } else {
        result = await BookServices.fetchListByListId({
          listId: this.userProfile.listBookViewed || [],
        });
      }

      if (result?.success && result.data.list?.length > 0) {
        this.setListFavorite(result.data.list);
      }
      return result;
    }

    return null;
  };

  updateUser = async (user: DataModels.IUser) => {
    const result = await UserServices.updateUser(user);

    if (result?.success && result.data) {
      this.setUserProfile(result.data.user);
    }
  };

  isBookFavorite = (bookId: string) => {
    const isFavorited = this.userProfile.listBookLiked.includes(bookId);
    return isFavorited;
  };
}

export { UserStore };
