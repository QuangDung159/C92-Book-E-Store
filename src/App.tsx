import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { useEffect, useRef } from 'react';
import React, { View } from 'react-native';

import Toast from 'react-native-toast-message';
import { Layouts } from '@components';
import { useNavigate } from '@hooks';
import { appModel } from '@store';
import { Navigation } from 'navigation';
import { BaseParamList } from './routes';

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
    console.log('queryParams :>> ', queryParams);

    if (path === 'payment-success') {
      openPaymentSuccessScreen();
    }
    if (path === 'home') {
      openHomeScreen();
    }
  }

  const linking = {
    prefixes: ['c92bookestorev1://'],
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
      <Layouts.VSpace value={24} />
      <Navigation />
    </NavigationContainer>
  );
};

export { App };
