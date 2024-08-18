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

  const openPaymentSuccessScreen = () => {
    navigation.navigate(SCREEN_NAME.CART_NAVIGATOR, {
      screen: SCREEN_NAME.PAYMENT_SUCCESS_SCREEN,
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
  };
};
