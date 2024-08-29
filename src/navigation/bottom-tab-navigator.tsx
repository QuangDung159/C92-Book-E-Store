import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import {
  AccountScreen,
  CategoriesScreen,
  HomeScreen,
  NotificationsScreen,
} from '@screens';
import { notificationStore } from '@store';
import { SCREEN_NAME } from '../constants';
import { COLORS, FONT_STYLES } from '../themes';

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
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: (focus) => {
              return renderTabBarIcon(
                (color) => (
                  <Entypo name="home" size={24} color={color}></Entypo>
                ),
                focus.focused,
              );
            },
            tabBarLabelStyle: styles.tabBarLabelStyle,
            // tabBarLabel: 'Trang chủ',
            tabBarLabel: 'Home',
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
            tabBarLabel: 'Category',
            // tabBarLabel: 'Danh mục',
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
                  <View>
                    {notificationStore.unReadNotification.length > 0 && (
                      <View style={styles.dot}>
                        <View
                          style={[
                            styles.dotStyle,
                            {
                              backgroundColor: color,
                            },
                          ]}
                        ></View>
                      </View>
                    )}
                    <MaterialIcons
                      name="notifications"
                      size={24}
                      color={color}
                    />
                  </View>
                ),
                focus.focused,
              );
            },
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarLabel: 'Notifications',
            tabBarStyle: styles.tabBarStyle,
          }}
          name={SCREEN_NAME.NOTIFICATIONS_SCREEN}
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
            tabBarLabel: 'Profile',
            // tabBarLabel: 'Tài khoản',
            tabBarStyle: styles.tabBarStyle,
          }}
          name={SCREEN_NAME.ACCOUNT_SCREEN}
          component={AccountScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
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
    ...FONT_STYLES.SEMIBOLD_12,
    color: COLORS.primaryBlack,
    marginTop: -4,
    marginBottom: Platform.select({
      android: 8,
      ios: 0,
    }),
  },
  tabBarStyle: Platform.select({
    ios: {
      height: 95,
      marginBottom: -30,
    },
    android: {
      height: 70,
    },
  }),
  dot: {
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(BottomTabNavigator);
export { observable as BottomTabNavigator };
