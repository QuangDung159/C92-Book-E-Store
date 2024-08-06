import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomTabNavigator } from './bottom-tab-navigator';

const Stack = createStackNavigator();

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
