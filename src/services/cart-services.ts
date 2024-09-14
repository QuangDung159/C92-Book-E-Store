import { API_URL } from '@constants';
import { DataModels } from '@models';
import { HttpServices } from './http-services';

const createCart = async (cartInput: DataModels.ICartParams) => {
  const result = await HttpServices.post(
    API_URL.cart + '/create-one',
    cartInput,
  );

  return result;
};

const fetchCart = async (userId: string) => {
  return await HttpServices.get(API_URL.cart + `/get?userId=${userId}`);
};

const updateCart = async (cartParams: DataModels.ICartParams) => {
  return await HttpServices.post(API_URL.cart + '/update-one', cartParams);
};

const updateCartItem = async (params: any) => {
  return await HttpServices.post(API_URL.cartItem + '/update-one', params);
};

const createCartItem = async (params: {
  count: number;
  cart: string;
  book: string;
}) => {
  return await HttpServices.post(API_URL.cartItem + '/create-one', params);
};

const deleteCartItem = async (id: string) => {
  return await HttpServices.post(API_URL.cartItem + '/delete-one', { id });
};

export const CartServices = {
  createCart,
  fetchCart,
  updateCartItem,
  createCartItem,
  deleteCartItem,
  updateCart,
};
