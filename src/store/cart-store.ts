import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { Linking } from 'react-native';
import {
  DEEP_LINK_PAYMENT_SUCCESS_URL,
  LIST_PAYMENT_METHOD,
  PAYMENT_TYPE,
} from '@constants';
import { DataModels } from '@models';
import {
  CartServices,
  MomoServices,
  OrderServices,
  ZaloPayServices,
} from '@services';
import { PaymentData, PaymentStatus, PaymentType, ZaloPayOrder } from '@types';
import { DatetimeHelpers, delay, StringHelpers } from '@utils';
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
  cart: DataModels.ICart | null = null;

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
      cart: observable,
      setCart: action,
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
      toJsonObject: computed,
    });

    this.userStore = userStore;

    this.referenceOptionsStore = referenceOptionsStore;

    this.paymentSelected = {
      paymentType: LIST_PAYMENT_METHOD[0].value as PaymentType,
      id: LIST_PAYMENT_METHOD[0].id,
    };
  }

  setCart(value: DataModels.ICart) {
    this.cart = value;
  }

  setCurrentOrder(value: DataModels.IOrder) {
    this.currentOrder = value;
  }

  setZaloAppTransId(value: string) {
    this.zaloAppTransId = value;
  }

  setCreditCardSelected(id: string) {
    const creditCard = (this.userStore.userProfile?.listCreditCard || []).find(
      (item) => item.id === id,
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

  get subPriceNotSale() {
    let subTotalValue = 0;

    const list = [...this.listCartItem];

    list.forEach((item) => {
      subTotalValue += item.book.priceNotSale * item.count;
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

  createCartItem = async (cartItem: DataModels.ICartItem) => {
    const result = await CartServices.createCartItem({
      count: cartItem.count,
      book: cartItem.book.id,
      cart: this.cart.id,
    });

    if (result?.success) {
      if (this.userStore.authenticated) {
        this.fetchCart(this.userStore.userProfile.id);
      }
    }
  };

  addToCart = async (addToCartItem: DataModels.ICartItem) => {
    if (this.cart) {
      // user have cart in processing
      runInAction(async () => {
        const cartItemExist = this.getCartItemByBook(
          addToCartItem.book.id,
        )?.cartItem;

        if (cartItemExist) {
          // update count
          const result = await CartServices.updateCartItem({
            id: cartItemExist.id,
            count: addToCartItem.count + cartItemExist.count,
          });

          if (result?.success) {
            if (this.userStore.authenticated) {
              this.fetchCart(this.userStore.userProfile.id);
            }
          }
        } else {
          // add new cart item
          this.createCartItem(addToCartItem);
        }
      });
    } else {
      // user don't have cart in processing
      runInAction(async () => {
        const result = await this.createCart({
          user: this.userStore.userProfile.id,
          status: 'processing',
        });

        await delay(1000);

        if (result?.success) {
          this.createCartItem(addToCartItem);
        }
      });
    }
  };

  deleteCartItem = async (id: string) => {
    const result = await CartServices.deleteCartItem(id);

    if (result?.success) {
      if (this.userStore.authenticated) {
        this.fetchCart(this.userStore.userProfile.id);
      }
    }
  };

  adjustCartItemCount = async (
    cartItem: DataModels.ICartItem,
    count: number,
  ) => {
    const result = await CartServices.updateCartItem({
      id: cartItem.id,
      count: cartItem.count + count,
    });

    if (result?.success) {
      if (this.userStore.authenticated) {
        this.fetchCart(this.userStore.userProfile.id);
      }
    }
  };

  get cartCount() {
    return this.listCartItem.length || 0;
  }

  get shippingAddressData() {
    const shippingAddress = (
      this.userStore.userProfile?.listShippingAddress || []
    ).find((item) => item.primary);

    return shippingAddress;
  }

  createOrder = async () => {
    const result = await OrderServices.createOrder({
      cartId: this.cart.id,
      userId: this.userStore.userProfile.id,
    });

    if (result?.success && result.data) {
      this.setCurrentOrder(result.data.order);
    }

    return (result?.data?.order || null) as DataModels.IOrder;
  };

  updateOrderStatus = async (status: PaymentStatus) => {
    const result = await OrderServices.updateOrder({
      ...this.currentOrder,
      paymentStatus: status,
    });

    if (result?.success && result.data) {
      this.setCurrentOrder(result.data.order);
    }
  };

  updateCart = async () => {
    const params = {
      ...this.toJsonObject,
      status: 'done',
      id: this.cart.id,
    };

    return await CartServices.updateCart(params);
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
    this.setZaloAppTransId('');
  };

  onFetchZaloPaymentInfo = async (appTransId: string) => {
    const response = await ZaloPayServices.fetchOrderInfo(
      +process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
      appTransId,
    );

    return response;
  };

  get toJsonObject(): DataModels.ICartParams {
    const data: DataModels.ICartParams = {
      subTotal: this.subTotal,
      shipping: this.shipping,
      discount: this.discount,
      shippingAddress:
        this.userStore.getFullAddress(this.shippingAddressData) || 'null',
      total: this.total,
      paymentType: this.paymentSelected.paymentType,
      status: 'processing',
      shippingInfo: `${this.shippingAddressData.name} - ${this.shippingAddressData.phoneNumber}`,
    };

    if (this.paymentSelected.paymentType === 'credit_card') {
      data.paymentInfo = this.paymentSelected.id;
    }

    return data;
  }

  async createCart(cartInput: DataModels.ICartParams) {
    const result = await CartServices.createCart(cartInput);

    if (result?.success && result.data) {
      this.setCart(result.data.cart);
    }

    return result;
  }

  async fetchCart(userId: string) {
    const result = await CartServices.fetchCart(userId);

    if (result && result.success && result.data) {
      const data = result.data;

      this.setCart(data.cart);
      this.setListCartItem(data.cart?.listCartItem || []);
    }
  }

  async submitOrder() {
    const result = await this.updateCart();

    let createOrderResult = null;
    if (result?.success) {
      createOrderResult = await this.createOrder();
    }

    if (createOrderResult)
      if (this.paymentSelected.paymentType === PAYMENT_TYPE.momo) {
        await this.handleMoMoPayment(async (result) => {
          if (await Linking.canOpenURL(result.data.payUrl)) {
            Linking.openURL(result.data.payUrl);
          }
        });
      } else {
        if (this.paymentSelected.paymentType === PAYMENT_TYPE.zalo_pay) {
          await this.handleZaloPayPayment();
        } else {
          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${this.currentOrder.id}&message=Payment success!`,
          );
        }
      }

    await delay(5000);
    if (this.userStore.authenticated) {
      this.fetchCart(this.userStore.userProfile.id);
      this.userStore.fetchListOrder('created');
    }
    this.clearAllCurrentPaymentInfo();
  }
}

export { CartStore };
