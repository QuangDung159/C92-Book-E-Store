import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import { BookListingScreen, FavoriteScreen } from '@screens';

import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function BookingListingNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={SCREEN_NAME.BOOK_LISTING_SCREEN}
          component={BookListingScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.FAVORITE_SCREEN}
          component={FavoriteScreen}
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

export { BookingListingNavigator };
