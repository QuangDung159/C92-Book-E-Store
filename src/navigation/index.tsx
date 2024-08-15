import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { SCREEN_NAME } from '@constants';
import { sharedStore } from '@store';
import { COLORS } from '@themes';
import { AccountNavigator } from './account-navigator';
import { BookDetailNavigator } from './book-detail-navigator';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { CartNavigator } from './cart-navigator';
import { SearchNavigator } from './search-navigator';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <>
      <Spinner
        visible={sharedStore.showLoading}
        textContent={'Loading...'}
        textStyle={{
          color: COLORS.primaryWhite,
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
      </Stack.Navigator>
    </>
  );
};
const observable = observer(Navigation);
export { observable as Navigation };
