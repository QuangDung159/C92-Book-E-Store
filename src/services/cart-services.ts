import { DataModels } from '@models';
import { HttpServices } from './http-services';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/cart';

const createCart = async (cartInput: DataModels.ICartInput) => {
  const result = await HttpServices.post(baseUrl + '/create-one', cartInput);

  console.log('result :>> ', result);
};

const fetchCart = async (userId: string) => {
  return await HttpServices.get(baseUrl + `/get?userId=${userId}`);
};

export const CartServices = { createCart, fetchCart };
