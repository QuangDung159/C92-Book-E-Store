import { HomeIcon } from '@assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen, CartScreen, CategoriesScreen, HomeScreen } from '@screens';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN_NAME } from '../constants';
import { COLORS } from '../themes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen options={{
        tabBarIcon: (focus) => {
          if (focus.focused) {
            return (
              <View style={styles.iconActive}>
                <HomeIcon color={COLORS.primaryWhite}></HomeIcon>
              </View>
            )
          }
          return (
            <HomeIcon></HomeIcon>
          )
        },
        tabBarLabelStyle: {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '200',
          color: COLORS.primaryBlack
        },
        tabBarLabel: 'Home'
      }} name={SCREEN_NAME.HOME} component={HomeScreen} />
      <Tab.Screen name="categories_screen" component={CategoriesScreen} />
      <Tab.Screen name="cart_screen" component={CartScreen} />
      <Tab.Screen name="account_screen" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
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
  }
})