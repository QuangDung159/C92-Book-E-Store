import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts, ScreenHeader } from '@components';
import {
  CanceledOrdersScreen,
  CompletedOrdersScreen,
  ProcessingOrdersScreen,
} from '@screens';
import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Tab = createMaterialTopTabNavigator();

function OrderNavigator() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <ScreenHeader title="Orders" navigation={navigation} showBackIcon />
      <Tab.Navigator initialRouteName={SCREEN_NAME.CANCELED_ORDERS_SCREEN}>
        <Tab.Screen
          name={SCREEN_NAME.COMPLETED_ORDERS_SCREEN}
          component={CompletedOrdersScreen}
        />
        <Tab.Screen
          name={SCREEN_NAME.CANCELED_ORDERS_SCREEN}
          component={CanceledOrdersScreen}
        />
        <Tab.Screen
          name={SCREEN_NAME.PROCESSING_ORDERS_SCREEN}
          component={ProcessingOrdersScreen}
        />
      </Tab.Navigator>
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
