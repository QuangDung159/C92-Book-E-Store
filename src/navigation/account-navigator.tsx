import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddEditAddressScreen, AddressScreen, LocationScreen } from '@screens';

import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={SCREEN_NAME.ADDRESS_SCREEN}
        component={AddressScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.ADD_EDIT_ADDRESS_SCREEN}
        component={AddEditAddressScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.LOCATION_SCREEN}
        component={LocationScreen}
      />
    </Stack.Navigator>
  );
}

export { AccountNavigator };
