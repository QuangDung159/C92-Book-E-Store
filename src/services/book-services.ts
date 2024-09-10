import { DataModels } from '@models';
import { HttpServices } from './http-services';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/book';

const fetchListByListId = async (params: { listId: string[] }) => {
  const result = await HttpServices.post(baseUrl + '/get-by-list-id', params);

  return result;
};

const queryBook = async (
  filter?: DataModels.ISearchFilter,
  sort?: DataModels.ISortOption,
  page?: number,
) => {
  const sortOption: any = {};
  const sortValue =
    sort?.value === 'name_asc' || sort?.value === 'price_asc' ? 1 : -1;

  if (sort.field === 'name') {
    sortOption.name = sortValue;
  }

  if (sort.field === 'price') {
    sortOption.price = sortValue;
  }

  const body = {
    ...filter,
    page: page || 1,
    sort: sortOption,
  };

  const result = await HttpServices.post(baseUrl, body);

  return result;
};

const fetchListHomePage = async (title: string, filter?: string) => {
  const filterQuery = filter ? `&filter=${filter}` : '';

  const result = await HttpServices.get(
    baseUrl + `/query?title=${title}` + filterQuery,
  );

  return result;
};

const fetchBookDetail = async (id: string) => {
  const result = await HttpServices.get(baseUrl + '/get-one/' + id);

  return result;
};

export const BookServices = {
  queryBook,
  fetchListHomePage,
  fetchBookDetail,
  fetchListByListId,
};
