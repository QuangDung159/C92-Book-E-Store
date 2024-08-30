import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import { OrderDetailScreen, OrdersScreen } from '@screens';
import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function OrderNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={SCREEN_NAME.ORDERS_SCREEN}
          component={OrdersScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.ORDER_DETAIL_SCREEN}
          component={OrderDetailScreen}
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

export { OrderNavigator };
