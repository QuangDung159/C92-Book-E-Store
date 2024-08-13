import { SCREEN_NAME } from '@constants';
import { DataModels } from '@models';

export const useNavigate = (navigation: any) => {
  const openSearchScreen = (params?: any) => {
    navigation.navigate(SCREEN_NAME.SEARCH_NAVIGATOR, {
      screen: SCREEN_NAME.SEARCH,
      params,
    });
  };

  const openFilterScreen = (priceRange: number[]) => {
    navigation.navigate(SCREEN_NAME.SEARCH_NAVIGATOR, {
      screen: SCREEN_NAME.FILTER_SCREEN,
      params: { priceRange },
    });
  };

  const openBookDetailScreen = (book: DataModels.IBook) => {
    navigation.navigate(SCREEN_NAME.BOOK_DETAIL_NAVIGATOR, {
      screen: SCREEN_NAME.BOOK_DETAIL_SCREEN,
      params: { book },
    });
  };

  const openCartScreen = () => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.CART_SCREEN,
    });
  };

  const openPaymentScreen = () => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.PAYMENT_SCREEN,
    });
  };

  return {
    openSearchScreen,
    openFilterScreen,
    openBookDetailScreen,
    openCartScreen,
    openPaymentScreen,
  };
};
