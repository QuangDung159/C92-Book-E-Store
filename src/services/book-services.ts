import { TOP_BOOKS } from '@constants';
import { DataModels } from '@models';
import { delay } from '@utils';
import { HttpServices } from './http-services';

const loadListFavourite = async () => {
  await delay(1000);
  const result = TOP_BOOKS.filter((item) => item.isLiked);

  return HttpServices.buildAxiosResponse({
    success: true,
    data: {
      list: result,
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
    page: 1,
    sort: sortOption,
  };

  const result = await HttpServices.post(
    process.env.EXPO_PUBLIC_BASE_URL + '/book',
    body,
  );

  return result;
};

export const BookServices = {
  loadListFavourite,
  loadListViewed,
  queryBook,
};
