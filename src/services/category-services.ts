import { API_URL } from '@constants';
import { HttpServices } from './http-services';

const fetchListCategory = async () => {
  const result = await HttpServices.get(API_URL.category);

  return result;
};

export const CategoryServices = {
  fetchListCategory,
};
