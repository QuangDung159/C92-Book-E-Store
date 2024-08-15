import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { LIST_PAYMENT_METHOD, TOP_BOOKS } from '@constants';
import { DataModels } from '@models';
import { ReferenceOptionsStore } from './reference-options-store';
import { UserStore } from './user-store';

class CartStore {
  listCartItem: DataModels.ICartItem[] = [
    {
      book: TOP_BOOKS[0],
      count: 1,
    },
  ];
  listVoucher: DataModels.IVoucher[] = [];
  listPaymentMethod: DataModels.IPaymentMethod[] = [];
  listVoucherIdSelected: string[] = [];
  shippingAddressSelected: string = '';
  referenceOptionsStore: ReferenceOptionsStore | null = null;
  userStore: UserStore | null = null;
  paymentSelected: DataModels.IPaymentMethod | null = null;
  creditCardSelected: DataModels.ICreditCard | null = null;

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
      userStore: observable,
      referenceOptionsStore: observable,
      paymentSelected: observable,
      creditCardSelected: observable,
      setCreditCardSelected: action,
      setPaymentSelected: action,
      setListVoucherIdSelected: action,
      setShippingAddressSelected: action,
      setListCartItem: action,
      setListVoucher: action,
      setListPaymentMethod: action,
      discount: computed,
      total: computed,
      subTotal: computed,
      shipping: computed,
      cartCount: computed,
      shippingSelectedData: computed,
      shippingAddressData: computed,
    });

    this.userStore = userStore;

    this.referenceOptionsStore = referenceOptionsStore;

    this.paymentSelected = {
      paymentType: LIST_PAYMENT_METHOD[0].value,
    };
  }

  setCreditCardSelected(cardNumber: string) {
    const creditCard = (this.userStore.userProfile?.listCreditCard || []).find(
      (item) => item.cardNumber === cardNumber,
    );

    if (creditCard) {
      this.creditCardSelected = creditCard;
    }
  }

  setPaymentSelected(value: DataModels.IPaymentMethod) {
    this.paymentSelected = value;
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

  get shippingSelectedData() {
    const listShippingAddress =
      this.userStore?.userProfile?.listShippingAddress || [];

    const shippingData = listShippingAddress.find(
      (item) => item.id === this.shippingAddressSelected,
    );

    return shippingData;
  }

  get shipping() {
    return this.shippingSelectedData?.shippingFee || 0;
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

    const list = [...this.listCartItem];

    list.forEach((item) => {
      subTotalValue += item.book.price * item.count;
    });

    return subTotalValue;
  }

  get total() {
    return (
      this.subTotal +
      (this.shippingSelectedData?.shippingFee || 0) -
      this.discount
    );
  }

  getCartItemByBook = (bookId: string) => {
    const cartItemExistIndex = this.listCartItem.findIndex(
      (item) => item.book.id === bookId,
    );

    return {
      index: cartItemExistIndex,
      cartItem:
        cartItemExistIndex !== -1
          ? this.listCartItem[cartItemExistIndex]
          : null,
    };
  };

  addToCart = async (addToCartItem: DataModels.ICartItem) => {
    runInAction(() => {
      const cartItemExist = this.getCartItemByBook(addToCartItem.book.id);

      const list = [...this.listCartItem];

      if (cartItemExist.cartItem) {
        const cartItemUpdate = cartItemExist.cartItem;

        cartItemUpdate.count = cartItemUpdate.count + addToCartItem.count;

        list.splice(cartItemExist.index, 1, cartItemUpdate);
      } else {
        list.push(addToCartItem);
      }
      this.listCartItem = list;
    });
  };

  removeCartItem = async (
    cartItem: DataModels.ICartItem,
    removeCount: number,
  ) => {
    runInAction(() => {
      const cartItemExist = this.getCartItemByBook(cartItem.book.id);

      let list = [...this.listCartItem];

      if (cartItemExist.cartItem) {
        const cartItemUpdate = cartItemExist.cartItem;

        if (removeCount >= cartItemUpdate.count) {
          list.splice(cartItemExist.index, 1);
        } else {
          cartItemUpdate.count = cartItemUpdate.count - removeCount;
          list = list.splice(cartItemExist.index, 1, cartItemUpdate);
        }
      }
      this.listCartItem = list;
    });
  };

  get cartCount() {
    return this.listCartItem.length;
  }

  get shippingAddressData() {
    const shippingAddress = (
      this.userStore.userProfile?.listShippingAddress || []
    ).find((item) => item.id === this.shippingAddressSelected);

    return shippingAddress;
  }
}

export { CartStore };
