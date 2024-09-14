import { API_URL } from '@constants';
import { AdministrativeUnitEnum } from '@types';
import { HttpServices } from './http-services';

const fetchListCategory = async () => {
  const result = await HttpServices.get(API_URL.category);

  return result;
};

const fetchListAuthor = async () => {
  const result = await HttpServices.get(API_URL.author);

  return result;
};

const fetchListPublisher = async () => {
  const result = await HttpServices.get(API_URL.publisher);

  return result;
};

const fetchListForm = async () => {
  const result = await HttpServices.get(API_URL.form);

  return result;
};

const fetchListAdministrative = async (level: AdministrativeUnitEnum) => {
  const result = await HttpServices.get(
    API_URL.shippingAddress + `/get-all-administrative-by-level?level=${level}`,
  );

  return result;
};

export const ReferenceOptionServices = {
  fetchListCategory,
  fetchListAuthor,
  fetchListPublisher,
  fetchListForm,
  fetchListAdministrative,
};
