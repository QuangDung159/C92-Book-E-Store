import { TOP_BOOKS } from '@constants';
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

const searchBook = async () => {
  const result = await HttpServices.post(
    process.env.EXPO_PUBLIC_BASE_URL + '/product/getAll',
    {
      page: 1,
      limit: 10,
      category: 'Sale',
    },
  );

  return result;
};

export const BookServices = {
  loadListFavourite,
  loadListViewed,
  searchBook,
};
