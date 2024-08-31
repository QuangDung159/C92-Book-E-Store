import { PAYMENT_STATUS } from '@constants';
import { DataModels } from '@models';
import { PaymentStatus } from '@types';
import { delay, StringHelpers } from '@utils';

const createOrder = async (cart: DataModels.ICart) => {
  await delay(2000);
  const order: DataModels.IOrder = {
    cart,
    paymentStatus: PAYMENT_STATUS.waitingForPay as PaymentStatus,
    id: StringHelpers.genLocalId('order'),
    status: 'created',
  };
  return order;
};

const updateOrder = async (order: DataModels.IOrder) => {
  await delay(2000);
  return order;
};

export const OrderServices = { createOrder, updateOrder };
