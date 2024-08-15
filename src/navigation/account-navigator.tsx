import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddEditAddress, AddressScreen } from '@screens';

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
        component={AddEditAddress}
      />
    </Stack.Navigator>
  );
}

export { AccountNavigator };
