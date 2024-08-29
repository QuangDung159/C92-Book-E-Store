/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { SplashScreen } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import React from 'react-native';
import {
  InAppMessageClickEvent,
  LogLevel,
  OneSignal,
} from 'react-native-onesignal';

import { IN_APP_MESSAGE_ACTION_ID, SCREEN_NAME } from '@constants';
import { useNavigate } from '@hooks';
import { appModel, notificationStore, sharedStore } from '@store';
import { delay, StringHelpers } from '@utils';
import { Navigation } from 'navigation';

// deeplink
// npx uri-scheme open "c92bookestorev1:///payment-success?orderId=123123123" --ios

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8081,
  });
}

const App = () => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const url = Linking.useURL();
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  const { openPaymentSuccessScreen, openHomeScreen, openPlayStore } =
    useNavigate(navigationRef.current);

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

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        notificationStore.setLatestNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response?.notification?.request?.content?.data?.url) {
          const dataFromUrl = StringHelpers.parseUrl(
            response.notification.request.content.data.url,
          );

          if (dataFromUrl?.screen) {
            handlePressNotification(dataFromUrl.screen);
          }
        }
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    OneSignal.InAppMessages.addEventListener('click', handleInAppMessageClick);

    return () => {
      OneSignal.InAppMessages.removeEventListener(
        'click',
        handleInAppMessageClick,
      );
    };
  }, []);

  const handleInAppMessageClick = (event: InAppMessageClickEvent) => {
    if (event?.result?.actionId === IN_APP_MESSAGE_ACTION_ID.openStore) {
      sharedStore.setShowLoading(true);
      delay(1000).then(() => {
        sharedStore.setShowLoading(false);
        openPlayStore();
      });
    }
  };

  const handlePressNotification = async (screenName: string) => {
    await delay(1000);
    switch (screenName.toUpperCase()) {
      case SCREEN_NAME.NOTIFICATIONS_SCREEN:
        navigationRef.current.navigate(SCREEN_NAME.BOTTOM_TAB_NAVIGATOR, {
          screen: SCREEN_NAME.NOTIFICATIONS_SCREEN,
        });
        break;
      default:
        break;
    }
  };

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
    SplashScreen.hideAsync();
  };

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

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Navigation />
    </NavigationContainer>
  );
};

const observable = observer(App);
export { observable as App };
