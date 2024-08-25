import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { LIST_PAYMENT_METHOD, TOP_BOOKS } from '@constants';
import { DataModels } from '@models';
import { MomoServices, OrderServices, ZaloPayServices } from '@services';
import { PaymentData, PaymentStatus, ZaloPayOrder } from '@types';
import { DatetimeHelpers, StringHelpers } from '@utils';
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
  referenceOptionsStore: ReferenceOptionsStore | null = null;
  userStore: UserStore | null = null;
  paymentSelected: DataModels.IPaymentMethod | null = null;
  creditCardSelected: DataModels.ICreditCard | null = null;
  currentOrder: DataModels.IOrder | null = null;

  constructor(
    userStore: UserStore,
    referenceOptionsStore: ReferenceOptionsStore,
  ) {
    makeObservable(this, {
      listCartItem: observable,
      listVoucher: observable,
      listPaymentMethod: observable,
      listVoucherIdSelected: observable,
      userStore: observable,
      referenceOptionsStore: observable,
      paymentSelected: observable,
      creditCardSelected: observable,
      currentOrder: observable,
      setCreditCardSelected: action,
      setPaymentSelected: action,
      setListVoucherIdSelected: action,
      setListCartItem: action,
      setListVoucher: action,
      setListPaymentMethod: action,
      setCurrentOrder: action,
      discount: computed,
      total: computed,
      subTotal: computed,
      shipping: computed,
      cartCount: computed,
      shippingAddressData: computed,
      cart: computed,
    });

    this.userStore = userStore;

    this.referenceOptionsStore = referenceOptionsStore;

    this.paymentSelected = {
      paymentType: LIST_PAYMENT_METHOD[0].value,
    };
  }

  setCurrentOrder(value: DataModels.IOrder) {
    this.currentOrder = value;
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

  get shipping() {
    return this.shippingAddressData?.shippingFee || 0;
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
      (this.shippingAddressData?.shippingFee || 0) -
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
    ).find((item) => item.primary);

    return shippingAddress;
  }

  get cart() {
    const cart: DataModels.ICart = {
      discount: this.discount,
      id: StringHelpers.genLocalId(),
      listCartItem: this.listCartItem,
      paymentMethod: this.paymentSelected,
      shipping: this.shipping,
      // shippingAddress: StringHelpers.getFullAddress(this.shippingAddressData),
      shippingAddress: 'aas duong',
      subTotal: this.subTotal,
      total: this.total,
    };

    return cart;
  }

  createOrder = async () => {
    const order = await OrderServices.createOrder(this.cart);
    this.setCurrentOrder(order);
    return order;
  };

  updateOrderStatus = async (status: PaymentStatus) => {
    const order = await OrderServices.updateOrder({
      ...this.currentOrder,
      paymentStatus: status,
    });
    this.setCurrentOrder(order);
  };

  onPaymentWithMoMo = async (
    orderId: string,
    requestId: string,
    amount: number,
    onSuccess?: (result: any) => void,
    onFail?: (result: any) => void,
  ) => {
    const params: PaymentData = {
      amount,
      ipnUrl: 'https://webhook.site/94e534cb-a54a-4313-8e91-c42f7aa2e145',
      orderId,
      orderInfo: 'Thanh toán qua ví MoMo',
      redirectUrl: `c92bookestorev1:///payment-success?orderId=${orderId}&message=Payment success with MoMo Wallet!`,
      requestId,
      extraData: '',
    };

    const result = await MomoServices.createMomoPayment(params);

    if (result?.statusCode === 200) {
      onSuccess?.(result);
    } else {
      onFail?.(result);
    }
  };

  onPaymentWithZaloPay = async (
    order: DataModels.IOrder,
    onCreateZaloPayOrder: (
      zpTransToken: string,
      subReturnCode: string,
      appTransIdGen: string,
    ) => void,
  ) => {
    const appTransIdGen =
      DatetimeHelpers.getCurrentDateYYMMDD() + '_' + new Date().getTime();

    const item = '[]';
    const description = 'Merchant description for order #' + order.id;

    const zpOrder: ZaloPayOrder = {
      appId: process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
      appUser: process.env.EXPO_PUBLIC_ZALO_PAY_APP_USER,
      appTime: new Date().getTime(),
      amount: order.cart.total,
      appTransId: appTransIdGen,
      embedData: '{"promotioninfo":""}',
      item,
      description,
    };

    ZaloPayServices.createOrder(zpOrder, (response) => {
      onCreateZaloPayOrder(
        response.zp_trans_token,
        response.sub_return_code,
        appTransIdGen,
      );
    });
  };
}

export { CartStore };
