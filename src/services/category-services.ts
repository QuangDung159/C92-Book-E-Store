import { HttpServices } from './http-services';

const fetchListCategory = async () => {
  const result = await HttpServices.get(
    process.env.EXPO_PUBLIC_BASE_URL + '/category',
  );

  return result;
};

export const CategoryServices = {
  fetchListCategory,
};
