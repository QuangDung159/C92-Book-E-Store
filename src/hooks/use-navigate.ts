import { Linking } from 'react-native';
import { SCREEN_NAME } from '@constants';
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

  const openAddEditAddressScreen = (
    shippingAddress?: DataModels.IShippingAddress,
    onSubmitShippingAddress?: (
      shippingAddress: DataModels.IShippingAddress,
      isAddNew?: boolean,
    ) => void,
  ) => {
    navigation.navigate(SCREEN_NAME.ACCOUNT_NAVIGATOR, {
      screen: SCREEN_NAME.ADD_EDIT_ADDRESS_SCREEN,
      params: {
        shippingAddress,
        onSubmitShippingAddress,
      },
    });
  };

  const openLocationScreen = (
    shippingAddress?: DataModels.IShippingAddress,
    onSubmitAdministrative?: (
      city: string,
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

  const openNotificationsScreen = () => {
    navigation.navigate(SCREEN_NAME.BOTTOM_TAB_NAVIGATOR, {
      screen: SCREEN_NAME.NOTIFICATIONS_SCREEN,
    });
  };

  const openOrdersScreen = () => {
    navigation.navigate(SCREEN_NAME.ORDER_NAVIGATOR, {
      screen: SCREEN_NAME.ORDERS_SCREEN,
    });
  };

  const openOrderDetailScreen = () => {
    navigation.navigate(SCREEN_NAME.ORDER_NAVIGATOR, {
      screen: SCREEN_NAME.ORDER_DETAIL_SCREEN,
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

  const openPlayStore = () => {
    const url = `https://play.google.com/store/apps/details?id=com.dragonc92team.BookEStoreV1`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
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
    openPlayStore,
    openOrdersScreen,
    openOrderDetailScreen,
  };
};
