import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts, ScreenHeader } from '@components';
import {
  CanceledOrdersScreen,
  CompletedOrdersScreen,
  CreatedOrdersScreen,
  ProcessingOrdersScreen,
} from '@screens';
import { COLORS, FONT_STYLES } from '@themes';
import { SCREEN_NAME } from '../constants';

const Tab = createMaterialTopTabNavigator();

function OrderTopTabbarNavigator() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <ScreenHeader title="Orders" navigation={navigation} showBackIcon />
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.CREATED_ORDERS_SCREEN}
        screenOptions={{
          tabBarStyle: {
            height: 40,
          },
        }}
      >
        <Tab.Screen
          name={SCREEN_NAME.CREATED_ORDERS_SCREEN}
          component={CreatedOrdersScreen}
          options={{
            tabBarLabelStyle: styles.title,
            tabBarItemStyle: styles.itemStyle,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.PROCESSING_ORDERS_SCREEN}
          component={ProcessingOrdersScreen}
          options={{
            tabBarLabelStyle: styles.title,
            tabBarItemStyle: styles.itemStyle,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.COMPLETED_ORDERS_SCREEN}
          component={CompletedOrdersScreen}
          options={{
            tabBarLabelStyle: styles.title,
            tabBarItemStyle: styles.itemStyle,
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.CANCELED_ORDERS_SCREEN}
          component={CanceledOrdersScreen}
          options={{
            tabBarLabelStyle: styles.title,
            tabBarItemStyle: styles.itemStyle,
          }}
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
  title: {
    ...FONT_STYLES.SEMIBOLD_12,
    marginTop: -6,
    textTransform: 'none',
  },
  itemStyle: {
    padding: 0,
  },
});

export { OrderTopTabbarNavigator };
