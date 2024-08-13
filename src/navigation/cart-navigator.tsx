import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CartScreen, PaymentScreen } from '@screens';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function CartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREEN_NAME.CART_SCREEN} component={CartScreen} />
      <Stack.Screen
        name={SCREEN_NAME.PAYMENT_SCREEN}
        component={PaymentScreen}
      />
    </Stack.Navigator>
  );
}

export { CartNavigator };
