import { API_URL } from '@constants';
import { HttpServices } from './http-services';

const fetchAllConfig = async () => {
  const result = await HttpServices.get(API_URL.config + '/get-all');
  return result;
};

export const ConfigServices = {
  fetchAllConfig,
};
