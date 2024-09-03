import { HttpServices } from './http-services';

const fetchListCategory = async () => {
  const result = await HttpServices.get(
    process.env.EXPO_PUBLIC_BASE_URL + '/category',
  );

  return result;
};

const fetchListAuthor = async () => {
  const result = await HttpServices.get(
    process.env.EXPO_PUBLIC_BASE_URL + '/author',
  );

  return result;
};

const fetchListPublisher = async () => {
  const result = await HttpServices.get(
    process.env.EXPO_PUBLIC_BASE_URL + '/publisher',
  );

  return result;
};

const fetchListForm = async () => {
  const result = await HttpServices.get(
    process.env.EXPO_PUBLIC_BASE_URL + '/form',
  );

  return result;
};

export const ReferenceOptionServices = {
  fetchListCategory,
  fetchListAuthor,
  fetchListPublisher,
  fetchListForm,
};
