/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { SplashScreen } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import React from 'react-native';
import {
  InAppMessageClickEvent,
  LogLevel,
  OneSignal,
} from 'react-native-onesignal';

import { IN_APP_MESSAGE_ACTION_ID } from '@constants';
import { useNavigate } from '@hooks';
import { appModel, sharedStore } from '@store';
import { delay } from '@utils';
import { Navigation } from 'navigation';

// deeplink
// npx uri-scheme open "c92bookestorev1:///payment-success-screen?orderId=123123123" --ios

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8081,
  });
}

const App = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  const { openSupportPage } = useNavigate(navigationRef.current);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts();
    appModel.appInit();
    appModel.loadMasterData();
    //
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID);
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
    // Also need enable notifications to complete OneSignal setup
    OneSignal.Notifications.requestPermission(true);
  }, []);

  const handleInAppMessageClick = useCallback(
    (event: InAppMessageClickEvent) => {
      if (event?.result?.actionId === IN_APP_MESSAGE_ACTION_ID.openStore) {
        sharedStore.setShowLoading(true);
        delay(1000).then(() => {
          sharedStore.setShowLoading(false);
          openSupportPage();
        });
      }
    },
    [openSupportPage],
  );

  useEffect(() => {
    OneSignal.InAppMessages.addEventListener('click', handleInAppMessageClick);

    return () => {
      OneSignal.InAppMessages.removeEventListener(
        'click',
        handleInAppMessageClick,
      );
    };
  }, [handleInAppMessageClick]);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
      'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
      'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'SF-Pro-Rounded-Medium': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
      'SF-Pro-Rounded-Semibold': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
      'SF-Pro-Rounded-Black': require('./assets/fonts/SF-Pro-Rounded-Black.otf'),
      'SF-Pro-Rounded-Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
      'SF-Pro-Rounded-Regular': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
      'SF-Pro-Rounded-Thin': require('./assets/fonts/SF-Pro-Rounded-Thin.otf'),
    });
    setFontsLoaded(true);
    SplashScreen.hideAsync();
  };

  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: [prefix],
  };

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Navigation />
    </NavigationContainer>
  );
};

const observable = observer(App);
export { observable as App };
