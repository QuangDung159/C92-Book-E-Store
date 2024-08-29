import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layouts } from '@components';
import {
  AddEditAddressScreen,
  AddressScreen,
  EditAccountScreen,
  ForgotPasswordScreen,
  LocationScreen,
  SignInScreen,
  SignUpScreen,
} from '@screens';

import { COLORS } from '@themes';
import { SCREEN_NAME } from '../constants';

const Stack = createStackNavigator();

function AccountNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Layouts.TopToast />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={SCREEN_NAME.ADDRESS_SCREEN}
          component={AddressScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.ADD_EDIT_ADDRESS_SCREEN}
          component={AddEditAddressScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.LOCATION_SCREEN}
          component={LocationScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.SIGN_IN_SCREEN}
          component={SignInScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.SIGN_UP_SCREEN}
          component={SignUpScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.EDIT_ACCOUNT_SCREEN}
          component={EditAccountScreen}
        />
        <Stack.Screen
          name={SCREEN_NAME.FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordScreen}
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

export { AccountNavigator };
