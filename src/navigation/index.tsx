import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AccountIcon, CartIcon, CategoriesIcon, HomeIcon } from '@assets';
import {
  AccountScreen,
  CartScreen,
  CategoriesScreen,
  HomeScreen,
} from '@screens';
import { SCREEN_NAME } from '../constants';
import { COLORS } from '../themes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const renderTabBarIcon = (
    icon: (color: string) => React.ReactNode,
    isFocused = false,
  ) => {
    const color = isFocused ? COLORS.primaryWhite : COLORS.primaryBlack;
    if (isFocused) {
      return <View style={styles.iconActive}>{icon(color)}</View>;
    }
    return <>{icon(color)}</>;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => <HomeIcon color={color}></HomeIcon>,
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Home',
        }}
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => <CategoriesIcon color={color}></CategoriesIcon>,
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Categories',
        }}
        name={SCREEN_NAME.CATEGORIES}
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => <CartIcon color={color}></CartIcon>,
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Cart',
        }}
        name={SCREEN_NAME.CART}
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => <AccountIcon color={color}></AccountIcon>,
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Account',
        }}
        name={SCREEN_NAME.ACCOUNT}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="app" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconActive: {
    height: 32,
    width: 64,
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabelStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '200',
    color: COLORS.primaryBlack,
  },
});
