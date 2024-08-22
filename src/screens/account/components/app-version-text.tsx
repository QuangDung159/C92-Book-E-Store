/* eslint-disable import/no-named-as-default */
import Constants from 'expo-constants';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { CODE_PUSH_NUMBER } from '@constants';
import { FONT_STYLES } from '@themes';

const AppVersionText: React.FC<any> = () => {
  const version = Constants.expoConfig.version;
  const buildNumber = Constants.expoConfig.ios.buildNumber; // iOS
  const versionCode = Constants.expoConfig.android.versionCode; // android

  const buildNumberDisplay = Platform.select({
    ios: buildNumber,
    android: versionCode.toString(),
  });

  return (
    <Text style={styles.textStyle}>
      {process.env.EXPO_PUBLIC_ENV} - {version} ({buildNumberDisplay}) -{' '}
      {CODE_PUSH_NUMBER}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...FONT_STYLES.REGULAR_12,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export { AppVersionText };
