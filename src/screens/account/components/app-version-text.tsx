/* eslint-disable import/no-named-as-default */
import Constants from 'expo-constants';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { FONT_STYLES } from '@themes';

const AppVersionText: React.FC<any> = () => {
  const version = Constants.expoConfig.version;
  const buildNumber = Constants.expoConfig.ios.buildNumber; // iOS
  const versionCode = Constants.expoConfig.android.versionCode; // android

  const buildNumberDisplay = Platform.select({
    ios: buildNumber,
    android. versionCode.toString(),
  });

  return (
    <Text style={styles.textStyle}>
      Version {process.env.EXPO_PUBLIC_ENV} - {version} ({buildNumberDisplay})
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
