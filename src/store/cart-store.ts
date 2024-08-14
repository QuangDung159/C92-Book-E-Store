import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DataModels } from '@models';
import { ReferenceOptionsStore } from './reference-options-store';
import { UserStore } from './user-store';

class CartStore {
  listCartItem: DataModels.ICartItem[] = [];
  listVoucher: DataModels.IVoucher[] = [];
  listPaymentMethod: DataModels.IPaymentMethod[] = [];
  listVoucherIdSelected: string[] = [];
  shippingAddressSelected: string = '';
  listShippingAddress: DataModels.IShippingAddress[] = [];
  referenceOptionsStore: ReferenceOptionsStore | null = null;
  userStore: UserStore | null = null;

  constructor(
    userStore: UserStore,
    referenceOptionsStore: ReferenceOptionsStore,
  ) {
    makeObservable(this, {
      listCartItem: observable,
      listVoucher: observable,
      listPaymentMethod: observable,
      listVoucherIdSelected: observable,
      shippingAddressSelected: observable,
      listShippingAddress: observable,
      userStore: observable,
      referenceOptionsStore: observable,
      setListVoucherIdSelected: action,
      setShippingAddressSelected: action,
      setListCartItem: action,
      setListVoucher: action,
      setListPaymentMethod: action,
      discount: computed,
      total: computed,
      subTotal: computed,
      shipping: computed,
    });

    this.userStore = userStore;

    this.listShippingAddress =
      userStore?.userProfile?.listShippingAddress || [];

    this.referenceOptionsStore = referenceOptionsStore;
  }

  setListCartItem(values: DataModels.ICartItem[]) {
    this.listCartItem = values;
  }

  setListVoucher(values: DataModels.IVoucher[]) {
    this.listVoucher = values;
  }

  setListPaymentMethod(values: DataModels.IPaymentMethod[]) {
    this.listPaymentMethod = values;
  }

  setListVoucherIdSelected(values: string[]) {
    this.listVoucherIdSelected = values;
  }

  setShippingAddressSelected(value: string) {
    this.shippingAddressSelected = value;
  }

  get shipping() {
    const shippingData = this.listShippingAddress.find(
      (item) => item.id === this.shippingAddressSelected,
    );

    return shippingData?.shippingFee || 0;
  }

  get discount() {
    let discountValue = 0;
    const listVoucher = this.listVoucher.filter((item) =>
      this.listVoucherIdSelected.includes(item.id),
    );

    listVoucher.forEach((item) => {
      discountValue += item.discountValue;
    });

    return discountValue;
  }

  get subTotal() {
    let subTotalValue = 0;

    this.listCartItem.forEach((item) => {
      subTotalValue += item.book.price;
    });

    return subTotalValue;
  }

  get total() {
    const shippingAddress = this.listShippingAddress.find(
      (item) => item.id === this.shippingAddressSelected,
    );

    return this.subTotal + (shippingAddress?.shippingFee || 0) - this.discount;
  }

  addToCart = async (addToCartItem: DataModels.ICartItem) => {
    const cartItemExistIndex = this.listCartItem.findIndex(
      (item) => item.id === addToCartItem.id,
    );

    let list = [...this.listCartItem];

    if (cartItemExistIndex !== -1) {
      //
      const cartItemUpdateCount = this.listCartItem[cartItemExistIndex];
      list = this.listCartItem.splice(cartItemExistIndex, 1, {
        ...cartItemUpdateCount,
        count: addToCartItem.count,
      });
    } else {
      list.push(addToCartItem);
    }

    runInAction(() => {
      this.listCartItem = list;
    });
  };
}

export { CartStore };
