import { DataModels } from '@models';
import { HttpServices } from './http-services';

const cartBaseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/cart';
const cartItemBaseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/cart-item';

const createCart = async (cartInput: DataModels.ICartParams) => {
  const result = await HttpServices.post(
    cartBaseUrl + '/create-one',
    cartInput,
  );

  return result;
};

const fetchCart = async (userId: string) => {
  return await HttpServices.get(cartBaseUrl + `/get?userId=${userId}`);
};

const updateCart = async (cartParams: DataModels.ICartParams) => {
  return await HttpServices.post(cartBaseUrl + '/update-one', cartParams);
};

const updateCartItem = async (params: any) => {
  return await HttpServices.post(cartItemBaseUrl + '/update-one', params);
};

const createCartItem = async (params: {
  count: number;
  cart: string;
  book: string;
}) => {
  return await HttpServices.post(cartItemBaseUrl + '/create-one', params);
};

const deleteCartItem = async (id: string) => {
  return await HttpServices.post(cartItemBaseUrl + '/delete-one', { id });
};

export const CartServices = {
  createCart,
  fetchCart,
  updateCartItem,
  createCartItem,
  deleteCartItem,
  updateCart,
};
