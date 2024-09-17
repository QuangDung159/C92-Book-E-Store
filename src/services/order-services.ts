import { API_URL } from '@constants';
import { userStore } from '@store';
import { OrderStatus } from '@types';
import { HttpServices } from './http-services';

const createOrder = async (params: { cartId: string; userId: string }) => {
  return await HttpServices.post(API_URL.order + '/create-one', {
    cart: params.cartId,
    user: params.userId,
  });
};

const updateOrder = async (params: any) => {
  return await HttpServices.post(API_URL.order + '/update-one', params);
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  return await HttpServices.post(API_URL.order + '/update-order-status', {
    id: orderId,
    status,
    user: userStore.userProfile.id,
  });
};

const fetchOrderById = async (orderId: string) => {
  return await HttpServices.get(API_URL.order + '/get-one/' + orderId);
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

export const OrderServices = {
  createOrder,
  updateOrder,
  fetchListOrder,
  fetchOrderById,
  updateOrderStatus,
};
