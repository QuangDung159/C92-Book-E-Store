import { PAYMENT_STATUS } from '@constants';
import { DataModels } from '@models';
import { PaymentStatus } from '@types';
import { delay } from '@utils';

const createOrder = async (cart: DataModels.ICart) => {
  await delay(2000);
  const order: DataModels.IOrder = {
    cart,
    paymentStatus: PAYMENT_STATUS.waitingForPay as PaymentStatus,
  };
  return order;
};

export const OrderServices = { createOrder };
