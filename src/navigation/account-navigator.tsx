import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  AddEditAddressScreen,
  AddressScreen,
  EditAccountScreen,
  LocationScreen,
  SignInScreen,
  SignUpScreen,
} from '@screens';

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
      <Stack.Screen
        name={SCREEN_NAME.SIGN_IN_SCREEN}
        component={SignInScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SIGN_UP_SCREEN}
        component={SignUpScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EDIT_ACCOUNT_SCREEN}
        component={EditAccountScreen}
      />
    </Stack.Navigator>
  );
}

export { AccountNavigator };
