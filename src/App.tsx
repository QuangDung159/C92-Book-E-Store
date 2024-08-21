/* eslint-disable @typescript-eslint/no-require-imports */
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { SplashScreen } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import React, { View } from 'react-native';

import Toast from 'react-native-toast-message';
import { useNavigate } from '@hooks';
import { appModel } from '@store';
import { Navigation } from 'navigation';
import { BaseParamList } from './routes';

// deeplink
// npx uri-scheme open "c92bookestorev1:///payment-success?orderId=123123123" --ios

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8081,
  });
}

const App = () => {
  const url = Linking.useURL();
  const navigationRef = useRef<NavigationContainerRef<BaseParamList>>(null);

  const { openPaymentSuccessScreen, openHomeScreen } = useNavigate(
    navigationRef.current,
  );

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      // Thêm các biến thể khác nếu cần
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    appModel.appInit();
    appModel.loadMasterData();
    loadFonts();
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

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }

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
