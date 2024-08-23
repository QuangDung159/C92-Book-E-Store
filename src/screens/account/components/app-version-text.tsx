/* eslint-disable import/no-named-as-default */
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { CODE_PUSH_NUMBER } from '@constants';
import { FONT_STYLES } from '@themes';

const AppVersionText: React.FC<any> = () => {
  const version = Constants.expoConfig.version;

  return (
    <Text style={styles.textStyle}>
      {process.env.EXPO_PUBLIC_ENV} - {version} ({CODE_PUSH_NUMBER})
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
