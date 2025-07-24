import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import {
  APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
  SCREEN_NAME,
  SHCEME,
  SUPPORT_LINK,
  UNKNOWN_ERROR_MESSAGE,
} from '@constants';
import { DataModels } from '@models';
import { delay } from '@utils';

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

  const openBookDetailScreen = (book?: DataModels.IBook, bookId?: string) => {
    navigation.navigate(SCREEN_NAME.BOOK_DETAIL_NAVIGATOR, {
      screen: SCREEN_NAME.BOOK_DETAIL_SCREEN,
      params: { book, bookId },
    });
  };

  const openCartScreen = () => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.CART_SCREEN,
    });
  };

  const openCheckoutScreen = () => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.CHECKOUT_SCREEN,
    });
  };

  const openHomeScreen = () => {
    navigation.navigate(SCREEN_NAME.BOTTOM_TAB_NAVIGATOR, {
      screen: SCREEN_NAME.HOME_SCREEN,
    });
  };

  const openPaymentSuccessScreen = (params?: any) => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.PAYMENT_SUCCESS_SCREEN,
      params,
    });
  };

  const openAddressScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.ADDRESS_SCREEN,
    });
  };

  const openPaymentCardScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.PAYMENT_CARD_SCREEN,
    });
  };

  const openVoucherScreen = (from?: string) => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.VOUCHER_SCREEN,
      params: {
        from,
      },
    });
  };

  const openAddEditAddressScreen = (
    shippingAddress?: DataModels.IShippingAddress,
  ) => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.ADD_EDIT_ADDRESS_SCREEN,
      params: {
        shippingAddress,
      },
    });
  };

  const openAddEditPaymentCardScreen = (
    paymentCard?: DataModels.ICreditCard,
  ) => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.ADD_EDIT_PAYMENT_CARD_SCREEN,
      params: {
        paymentCard,
      },
    });
  };

  const openLocationScreen = (
    shippingAddress?: DataModels.IShippingAddress,
    onSubmitAdministrative?: (
      province: string,
      district: string,
      ward: string,
    ) => void,
  ) => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.LOCATION_SCREEN,
      params: {
        shippingAddress,
        onSubmitAdministrative: onSubmitAdministrative,
      },
    });
  };

  const openSignInScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.SIGN_IN_SCREEN,
    });
  };

  const openSignUpScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.SIGN_UP_SCREEN,
    });
  };

  const openAccountScreen = () => {
    navigation.navigate(SCREEN_NAME.BOTTOM_TAB_NAVIGATOR, {
      screen: SCREEN_NAME.ACCOUNT_SCREEN,
    });
  };

  const openEditAccountScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.EDIT_ACCOUNT_SCREEN,
    });
  };

  const openForgotPasswordScreen = () => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.FORGOT_PASSWORD_SCREEN,
    });
  };

  const openBookListingScreen = (
    listBook: DataModels.IBook[],
    title: string,
  ) => {
    navigation.navigate(SCREEN_NAME.BOOK_LISTING_NAVIGATOR, {
      screen: SCREEN_NAME.BOOK_LISTING_SCREEN,
      params: {
        listBook,
        title,
      },
    });
  };

  const openFavoriteScreen = () => {
    navigation.navigate(SCREEN_NAME.BOOK_LISTING_NAVIGATOR, {
      screen: SCREEN_NAME.FAVORITE_SCREEN,
    });
  };

  const openNotificationsScreen = () => {
    navigation.navigate(SCREEN_NAME.BOTTOM_TAB_NAVIGATOR, {
      screen: SCREEN_NAME.NOTIFICATIONS_SCREEN,
    });
  };

  const openOrdersScreen = () => {
    navigation.navigate(SCREEN_NAME.ORDER_TOP_TABBAR_NAVIGATOR);
  };

  const openOrderDetailScreen = (
    order?: DataModels.IOrder,
    orderId?: string,
  ) => {
    navigation.navigate(SCREEN_NAME.ORDER_NAVIGATOR, {
      screen: SCREEN_NAME.ORDER_DETAIL_SCREEN,
      params: {
        order,
        orderId,
      },
    });
  };

  const handleNotificationNavigate = async (screenName: string) => {
    await delay(1000);
    switch (screenName.toUpperCase()) {
      case SCREEN_NAME.NOTIFICATIONS_SCREEN:
        openNotificationsScreen();
        break;
      default:
        break;
    }
  };

  const openAplicationStore = () => {
    const url = Platform.select({
      android: GOOGLE_PLAY_STORE_URL,
      ios: APP_STORE_URL,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error(UNKNOWN_ERROR_MESSAGE, err));
  };

  const openSupportPage = () => {
    Linking.openURL(SUPPORT_LINK);
  };

  const handleNavigateFromLinking = async (url: string) => {
    const { path, queryParams } = Linking.parse(url);

    const screenName = path.replace(SHCEME, '');

    if (screenName === SCREEN_NAME.PAYMENT_SUCCESS_SCREEN) {
      openPaymentSuccessScreen({
        orderId: queryParams?.orderId,
        message: queryParams?.message,
      });
    }

    if (screenName === SCREEN_NAME.BOOK_DETAIL_SCREEN) {
      delay(1000).then(() => {
        openBookDetailScreen(null, queryParams?.bookId as string);
      });
    }

    if (screenName === SCREEN_NAME.ORDER_DETAIL_SCREEN) {
      delay(1000).then(() => {
        openOrderDetailScreen(null, queryParams?.orderId as string);
      });
    }

    if (screenName === SCREEN_NAME.VOUCHER_SCREEN) {
      delay(1000).then(() => {
        openVoucherScreen();
      });
    }

    if (screenName === SCREEN_NAME.HOME_SCREEN) {
      openHomeScreen();
    }
  };

  return {
    openSearchScreen,
    openFilterScreen,
    openBookDetailScreen,
    openCartScreen,
    openCheckoutScreen,
    openHomeScreen,
    openPaymentSuccessScreen,
    openAddressScreen,
    openAddEditAddressScreen,
    openLocationScreen,
    openSignInScreen,
    openSignUpScreen,
    openAccountScreen,
    openEditAccountScreen,
    openForgotPasswordScreen,
    openBookListingScreen,
    openNotificationsScreen,
    handleNotificationNavigate,
    openAplicationStore,
    openOrdersScreen,
    openOrderDetailScreen,
    openFavoriteScreen,
    handleNavigateFromLinking,
    openPaymentCardScreen,
    openAddEditPaymentCardScreen,
    openVoucherScreen,
    openSupportPage,
  };
};
