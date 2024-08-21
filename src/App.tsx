import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { useEffect, useRef } from 'react';
import React, { View } from 'react-native';

import Toast from 'react-native-toast-message';
import { useNavigate } from '@hooks';
import { appModel } from '@store';
import { Navigation } from 'navigation';
import { BaseParamList } from './routes';

// deeplink
// npx uri-scheme open "c92bookestorev1:///payment-success?orderId=123123123" --ios

const App = () => {
  const url = Linking.useURL();
  const navigationRef = useRef<NavigationContainerRef<BaseParamList>>(null);

  const { openPaymentSuccessScreen, openHomeScreen } = useNavigate(
    navigationRef.current,
  );

  useEffect(() => {
    appModel.appInit();
    appModel.loadMasterData();
  }, []);

  if (url) {
    const { path, queryParams } = Linking.parse(url);

    if (path === 'payment-success') {
      openPaymentSuccessScreen({
        orderId: queryParams?.orderId,
        message: queryParams?.message,
      });
    }
    if (path === 'home') {
      openHomeScreen();
    }
  }

  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <View
        style={{
          zIndex: 199,
        }}
      >
        <Toast visibilityTime={2000} topOffset={0} />
      </View>
      <Navigation />
    </NavigationContainer>
  );
};

export { App };
