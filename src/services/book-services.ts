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
  console.log('filter :>> ', filter);
  console.log('sort :>> ', sort);
  const result = await HttpServices.post(
    process.env.EXPO_PUBLIC_BASE_URL + '/product/getAll',
    {
      page: 1,
      limit: 10,
      category: 'Sale',
    },
  );

  console.log('result :>> ', result);

  return result;
};

export const BookServices = {
  loadListFavourite,
  loadListViewed,
  queryBook,
};
