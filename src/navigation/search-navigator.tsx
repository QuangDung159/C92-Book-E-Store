import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FilterScreen, SearchScreen } from '@screens';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAME.SEARCH} component={SearchScreen} />
      <Stack.Screen name={SCREEN_NAME.FILTER_SCREEN} component={FilterScreen} />
    </Stack.Navigator>
  );
}

export { SearchNavigator };
