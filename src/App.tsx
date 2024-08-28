/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */
import * as Installations from '@react-native-firebase/installations';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { SplashScreen } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import React, { View } from 'react-native';

import Toast from 'react-native-toast-message';
import { SCREEN_NAME } from '@constants';
import { useNavigate } from '@hooks';
import { appModel, notificationStore } from '@store';
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

  const { openPaymentSuccessScreen, openHomeScreen } = useNavigate(
    navigationRef.current,
  );

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts();
    appModel.appInit();
    appModel.loadMasterData();
    getInstallationId();
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        notificationStore.setLatestNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(JSON.stringify(response));
        const dataFromUrl = StringHelpers.parseUrl(
          response.notification.request.content.data.url,
        );

        if (dataFromUrl?.screen) {
          handlePressNotification(dataFromUrl.screen);
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

  async function getInstallationId() {
    const installations = Installations.getInstallations();
    const id = await Installations.getId(installations);
    console.log('installationsId :>> ', id);
  }

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
      <View
        style={{
          zIndex: 199,
        }}
      >
        <Toast visibilityTime={2000} topOffset={45} />
      </View>
      <Navigation />
    </NavigationContainer>
  );
};

const observable = observer(App);
export { observable as App };
