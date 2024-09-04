import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { DEEP_LINK_PAYMENT_SUCCESS_URL, LIST_PAYMENT_METHOD } from '@constants';
import { DataModels } from '@models';
import {
  CartServices,
  MomoServices,
  OrderServices,
  ZaloPayServices,
} from '@services';
import { PaymentData, PaymentStatus, PaymentType, ZaloPayOrder } from '@types';
import { DatetimeHelpers, StringHelpers } from '@utils';
import { ReferenceOptionsStore } from './reference-options-store';
import { UserStore } from './user-store';

class CartStore {
  listCartItem: DataModels.ICartItem[] = [];
  listVoucher: DataModels.IVoucher[] = [];
  listPaymentMethod: DataModels.IPaymentMethod[] = [];
  listVoucherIdSelected: string[] = [];
  referenceOptionsStore: ReferenceOptionsStore | null = null;
  userStore: UserStore | null = null;
  paymentSelected: DataModels.IPaymentMethod | null = null;
  creditCardSelected: DataModels.ICreditCard | null = null;
  currentOrder: DataModels.IOrder | null = null;
  zaloAppTransId: string = '';
  currentCart: DataModels.ICart | null = null;

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
      zaloAppTransId: observable,
      currentCart: observable,
      setCurrentCart: action,
      setCreditCardSelected: action,
      setZaloAppTransId: action,
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
      toJsonObject: computed,
    });

    this.userStore = userStore;

    this.referenceOptionsStore = referenceOptionsStore;

    this.paymentSelected = {
      paymentType: LIST_PAYMENT_METHOD[0].value as PaymentType,
      id: LIST_PAYMENT_METHOD[0].id,
    };
  }

  setCurrentCart(value: DataModels.ICart) {
    this.currentCart = value;
  }

  // fromJsonObject(cart: DataModels.ICart) {
  // }

  setCurrentOrder(value: DataModels.IOrder) {
    this.currentOrder = value;
  }

  setZaloAppTransId(value: string) {
    this.zaloAppTransId = value;
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
    return this.currentCart?.listCartItem.length || 0;
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
      redirectUrl: `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${orderId}&message=Payment success with MoMo Wallet!`,
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

  handleMoMoPayment = async (onSuccess?: (result: any) => void) => {
    await this.onPaymentWithMoMo(
      this.currentOrder.id,
      StringHelpers.genLocalId(),
      this.total,
      async (result) => {
        this.updateOrderStatus('success');
        onSuccess?.(result);
      },
    );
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

  handleZaloPayPayment = async () => {
    await this.onPaymentWithZaloPay(
      this.currentOrder,
      (zpTransToken, subReturnCode, appTransId) => {
        this.setZaloAppTransId(appTransId);

        if (+subReturnCode === 1 && zpTransToken) {
          ZaloPayServices.payOrder(zpTransToken);
        }
      },
    );
  };

  clearAllCurrentPaymentInfo = () => {
    this.setCurrentOrder(null);
    this.setZaloAppTransId('');
  };

  onFetchZaloPaymentInfo = async (appTransId: string) => {
    const response = await ZaloPayServices.fetchOrderInfo(
      +process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
      appTransId,
    );

    return response;
  };

  get toJsonObject(): DataModels.ICartInput {
    const cart = this.cart;
    const data: DataModels.ICartInput = {
      subTotal: cart.subTotal,
      shipping: cart.shipping,
      discount: cart.discount,
      shippingAddress: cart.shippingAddress,
      total: cart.total,
      paymentType: cart.paymentMethod.paymentType,
      user: '66d821f534d631e25f9066e3',
      status: 'processing',
    };

    if (cart.paymentMethod.paymentType === 'credit_card') {
      data.paymentInfo = cart.paymentMethod.paymentInfo?.id;
    }

    return data;
  }

  async createCart(cartInput: DataModels.ICartInput) {
    const result = await CartServices.createCart(cartInput);

    console.log('result :>> ', result);
  }

  async fetchCart(userId: string) {
    const result = await CartServices.fetchCart(userId);

    if (result && result.success && result.data) {
      console.log('result :>> ', result.data.cart);
      this.setCurrentCart(result.data.cart);
    }
  }
}

export { CartStore };
