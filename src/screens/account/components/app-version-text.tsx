/* eslint-disable import/no-named-as-default */
import Constants from 'expo-constants';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CODE_PUSH_NUMBER } from '@constants';
import { sharedStore } from '@store';
import { FONT_STYLES } from '@themes';

const AppVersionText: React.FC<any> = () => {
  const version = Constants.expoConfig.version;

  return (
    <TouchableOpacity activeOpacity={1} onLongPress={sharedStore.toggleDevMode}>
      <Text style={styles.textStyle}>
        {process.env.EXPO_PUBLIC_ENV} - {version} ({CODE_PUSH_NUMBER})
        {sharedStore.isDevMode && ' - DEV'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    ...FONT_STYLES.REGULAR_12,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

const observable = observer(AppVersionText);
export { observable as AppVersionText };
