import { TOP_BOOKS } from '@constants';
import { DataModels } from '@models';
import { delay } from '@utils';
import { HttpServices } from './http-services';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/book';

const loadListFavourite = async () => {
  await delay(1000);
  const result = TOP_BOOKS.filter((item) => item.isLiked);

  return HttpServices.buildAxiosResponse({
    success: true,
    data: {
      list: TOP_BOOKS,
    },
  });
};

const loadListViewed = async () => {
  await delay(1000);
  const result = TOP_BOOKS.filter((item) => item.isLiked);

  return HttpServices.buildAxiosResponse({
    success: true,
    data: {
      list: result,
    },
  });
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
  loadListFavourite,
  loadListViewed,
  queryBook,
  fetchListHomePage,
  fetchBookDetail,
};
