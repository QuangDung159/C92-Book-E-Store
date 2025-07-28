/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { AppVersionServices } from '@services';
import { delay } from '@utils';

export const useCheckVersion = () => {
  const appState = useRef(AppState.currentState);

  const currentVersion = Constants.expoConfig?.version;

  const [showPopup, setShowPopup] = useState(false);

  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  const triggerShowVersionPopup = useCallback(async () => {
    if (process.env.EXPO_PUBLIC_ENV === 'PROD') {
      const latestAndroidVersion =
        Platform.OS === 'android'
          ? await AppVersionServices.getLatestVersionAndroid()
          : null;

      const latestIOSVersion =
        Platform.OS === 'ios'
          ? await AppVersionServices.getLatestVersionIOS()
          : null;

      const latestVersion = latestAndroidVersion || latestIOSVersion;

      if (!latestVersion) return;

      delay(1000).then(() => {
        setShowPopup(currentVersion !== latestVersion);
      });
    }
  }, [currentVersion]);

  useEffect(() => {
    triggerShowVersionPopup();
  }, [triggerShowVersionPopup]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isUpdatePending || isUpdateAvailable) {
          Updates.reloadAsync();
        }

        triggerShowVersionPopup();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerShowVersionPopup, isUpdatePending, isUpdateAvailable]);

  return {
    showPopup,
    showDownloadButton,
    runTypeMessage,
    isUpdatePending,
  };
};
