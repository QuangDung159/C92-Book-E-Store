import { Share } from 'react-native';
import { API_URL, APP_LINK_URL, SCREEN_NAME } from '@constants';
import { DataModels } from '@models';
import { HttpServices } from './http-services';

const fetchListByListId = async (params: { listId: string[] }) => {
  const result = await HttpServices.post(
    API_URL.book + '/get-by-list-id',
    params,
  );

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

  const result = await HttpServices.post(API_URL.book, body);

  return result;
};

const fetchListHomePage = async (title: string, filter?: string) => {
  const filterQuery = filter ? `&filter=${filter}` : '';

  const result = await HttpServices.get(
    API_URL.book + `/query?title=${title}` + filterQuery,
  );

  return result;
};

const fetchBookDetail = async (id: string) => {
  const result = await HttpServices.get(API_URL.book + '/get-one/' + id);

  return result;
};

const onShare = async (bookId: string) => {
  try {
    const result = await Share.share({
      message: `${APP_LINK_URL}${SCREEN_NAME.BOOK_DETAIL_SCREEN}?bookId=${bookId}`,
      title: 'Checkout this awesome book!',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // If you want to track which activity was used to share
        console.log(`Shared via ${result.activityType}`);
      } else {
        // Shared successfully
        console.log('Shared successfully');
      }
    } else if (result.action === Share.dismissedAction) {
      // Share was dismissed
      console.log('Share dismissed');
    }
  } catch (error) {
    console.error('Error sharing:', error.message);
  }
};

export const BookServices = {
  queryBook,
  fetchListHomePage,
  fetchBookDetail,
  fetchListByListId,
  onShare,
};
