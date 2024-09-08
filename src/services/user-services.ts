import { API_URL } from '@constants';
import { DataModels } from '@models';
import { HttpServices } from './http-services';

const createShippingAddress = async (
  params: DataModels.IShippingAddress,
  userId: string,
) => {
  const body = {
    ...params,
    user: userId,
  };

  return await HttpServices.post(
    API_URL.shippingAddress + '/create-shipping-address',
    body,
  );
};

const updateShippingAddress = async (
  params: DataModels.IShippingAddress,
  addressId: string,
) => {
  const body = {
    ...params,
    id: addressId,
  };

  return await HttpServices.post(
    API_URL.shippingAddress + '/update-shipping-address',
    body,
  );
};

export const UserServices = { createShippingAddress, updateShippingAddress };
