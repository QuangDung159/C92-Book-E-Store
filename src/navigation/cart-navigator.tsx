import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import { CartScreen, CheckoutScreen, PaymentSuccessScreen } from '@screens';
import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function CartNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAME.CART_SCREEN} component={CartScreen} />
        <Stack.Screen
          name={SCREEN_NAME.CHECKOUT_SCREEN}
          component={CheckoutScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.PAYMENT_SUCCESS_SCREEN}
          component={PaymentSuccessScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

export { CartNavigator };
