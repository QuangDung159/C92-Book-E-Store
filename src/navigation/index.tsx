import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SCREEN_NAME } from '@constants';
import { BookDetailNavigator } from './book-detail-navigator';
import { BottomTabNavigator } from './bottom-tab-navigator';
import { SearchNavigator } from './search-navigator';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="app" component={BottomTabNavigator} />
      <Stack.Screen
        name={SCREEN_NAME.SEARCH_NAVIGATOR}
        component={SearchNavigator}
      />
      <Stack.Screen
        name={SCREEN_NAME.BOOK_DETAIL_NAVIGATOR}
        component={BookDetailNavigator}
      />
    </Stack.Navigator>
  );
}
