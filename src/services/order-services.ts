import { API_URL } from '@constants';
import { DataModels } from '@models';
import { OrderStatus } from '@types';
import { HttpServices } from './http-services';

const createOrder = async (params: { cartId: string; userId: string }) => {
  return await HttpServices.post(API_URL.order + '/create-one', {
    cart: params.cartId,
    user: params.userId,
  });
};

const updateOrder = async (params: DataModels.IOrder) => {
  return await HttpServices.post(API_URL.order + '/update-one', params);
};

const fetchListOrder = async (params: {
  userId: string;
  orderStatus: OrderStatus;
}) => {
  return await HttpServices.get(
    API_URL.order +
      '/get' +
      `?userId=${params.userId}&status=${params.orderStatus}`,
  );
};

export const OrderServices = { createOrder, updateOrder, fetchListOrder };
