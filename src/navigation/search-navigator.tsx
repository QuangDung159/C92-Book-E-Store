import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import { FilterScreen, SearchScreen } from '@screens';
import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function SearchNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREEN_NAME.SEARCH} component={SearchScreen} />
        <Stack.Screen
          name={SCREEN_NAME.FILTER_SCREEN}
          component={FilterScreen}
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

export { SearchNavigator };
