import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BookListingScreen } from '@screens';

import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function BookingListingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SCREEN_NAME.BOOK_LISTING_SCREEN}
        component={BookListingScreen}
      />
    </Stack.Navigator>
  );
}

export { BookingListingNavigator };
