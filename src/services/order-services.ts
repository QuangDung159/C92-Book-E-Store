import { DataModels } from '@models';
import { OrderStatus } from '@types';
import { HttpServices } from './http-services';

const orderBaseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/order';

const createOrder = async (params: { cartId: string; userId: string }) => {
  return await HttpServices.post(orderBaseUrl + '/create-one', {
    cart: params.cartId,
    user: params.userId,
  });
};

const updateOrder = async (params: DataModels.IOrder) => {
  return await HttpServices.post(orderBaseUrl + '/update-one', params);
};

const fetchListOrder = async (params: {
  userId: string;
  orderStatus: OrderStatus;
}) => {
  return await HttpServices.get(
    orderBaseUrl +
      '/get' +
      `?userId=${params.userId}&status=${params.orderStatus}`,
  );
};

export const OrderServices = { createOrder, updateOrder, fetchListOrder };
