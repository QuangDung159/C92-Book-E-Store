import { action, computed, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { UserStore } from './user-store';

class CartStore {
  listCartItem: DataModels.ICartItem[] = [];
  listVoucher: DataModels.IVoucher[] = [];
  listPaymentMethod: DataModels.IPaymentMethod[] = [];
  listVoucherIdSelected: string[] = [];
  shippingAddressSelected: string = '';
  listShippingAddress: DataModels.IShippingAddress[] = [];

  constructor(userStore: UserStore) {
    makeObservable(this, {
      listCartItem: observable,
      listVoucher: observable,
      listPaymentMethod: observable,
      listVoucherIdSelected: observable,
      shippingAddressSelected: observable,
      listShippingAddress: observable,
      setListShippingAddress: action,
      setListVoucherIdSelected: action,
      setShippingAddressSelected: action,
      setListCartItem: action,
      setListVoucher: action,
      setListPaymentMethod: action,
      discount: computed,
      total: computed,
      subTotal: computed,
    });

    console.log('userStore?.userProfile :>> ', userStore?.userProfile);
    console.log('userStore :>> ', userStore);

    this.listShippingAddress =
      userStore?.userProfile?.listShippingAddress || [];
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

  setListShippingAddress(values: DataModels.IShippingAddress[]) {
    this.listShippingAddress = values;
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
}

export { CartStore };
