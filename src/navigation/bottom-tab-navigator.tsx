import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AccountScreen,
  CategoriesScreen,
  HomeScreen,
  NotificationsScreen,
} from '@screens';
import { SCREEN_NAME } from '../constants';
import { COLORS } from '../themes';

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
              (color) => <Entypo name="home" size={24} color={color}></Entypo>,
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Trang chủ',
          tabBarStyle: styles.tabBarStyle,
        }}
        name={SCREEN_NAME.HOME_SCREEN}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => (
                <MaterialIcons
                  name="category"
                  size={24}
                  color={color}
                ></MaterialIcons>
              ),
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Danh mục',
          tabBarStyle: styles.tabBarStyle,
        }}
        name={SCREEN_NAME.CATEGORIES}
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => (
                <MaterialIcons name="notifications" size={24} color={color} />
              ),
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Thông báo',
          tabBarStyle: styles.tabBarStyle,
        }}
        name={SCREEN_NAME.NOTIFICATIONS}
        component={NotificationsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (focus) => {
            return renderTabBarIcon(
              (color) => (
                <MaterialIcons
                  name="account-box"
                  size={24}
                  color={color}
                ></MaterialIcons>
              ),
              focus.focused,
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: 'Tài khoản',
          tabBarStyle: styles.tabBarStyle,
        }}
        name={SCREEN_NAME.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
    </Tab.Navigator>
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
  tabBarStyle: {
    height: 100,
    marginBottom: -30,
  },
});

export { BottomTabNavigator };
