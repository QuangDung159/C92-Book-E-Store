/* eslint-disable import/no-named-as-default */
import { NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Layouts } from '@components';
import { SCREEN_NAME } from '@constants';
import { useNavigate } from '@hooks';
import { sharedStore } from '@store';
import { COLORS } from '@themes';
import { delay } from '@utils';
import { AccountNavigator } from './account-navigator';
import { BookDetailNavigator } from './book-detail-navigator';
import { BookingListingNavigator } from './book-listing-navigator';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { CartNavigator } from './cart-navigator';
import { OrderNavigator } from './order-navigator';
import { OrderTopTabbarNavigator } from './order-top-tabbar-navigator';
import { SearchNavigator } from './search-navigator';

const Stack = createStackNavigator();

const Navigation = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const appState = useRef(AppState.currentState);

  const version = Constants.expoConfig.version;

  const { openPlayStore } = useNavigate(navigationRef.current);

  const [showPopup, setShowPopup] = useState(false);

  const triggerShowVersionPopup = useCallback(() => {
    if (process.env.EXPO_PUBLIC_ENV === 'PROD') {
      delay(1000).then(() => {
        setShowPopup(sharedStore.getConfig('app_version') !== version);
      });
    }
  }, [version]);

  useEffect(() => {
    triggerShowVersionPopup();
  }, [triggerShowVersionPopup]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        sharedStore.fetchListConfig().then(() => {
          triggerShowVersionPopup();
        });
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [triggerShowVersionPopup]);

  return (
    <>
      <Spinner
        visible={sharedStore.showLoading}
        textStyle={{
          color: COLORS.primaryWhite,
        }}
      />
      <Layouts.ConfirmPopup
        title="New version was released"
        content={`Please update to the latest version of Book E-Store to enjoy new features and an enhanced experience!`}
        visible={showPopup}
        okTitle="Go to store"
        hasCancel={false}
        onOk={() => {
          openPlayStore();
        }}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name={SCREEN_NAME.BOTTOM_TAB_NAVIGATOR}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.SEARCH_NAVIGATOR}
          component={SearchNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.BOOK_DETAIL_NAVIGATOR}
          component={BookDetailNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.CART_NAVIGATOR}
          component={CartNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.ACCOUNT_NAVIGATOR}
          component={AccountNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.BOOK_LISTING_NAVIGATOR}
          component={BookingListingNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.ORDER_TOP_TABBAR_NAVIGATOR}
          component={OrderTopTabbarNavigator}
        />
        <Stack.Screen
          name={SCREEN_NAME.ORDER_NAVIGATOR}
          component={OrderNavigator}
        />
      </Stack.Navigator>
    </>
  );
};
const observable = observer(Navigation);
export { observable as Navigation };
