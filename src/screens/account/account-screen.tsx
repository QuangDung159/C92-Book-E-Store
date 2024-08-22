import Constants from 'expo-constants';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScreenHeader } from '@components';
import { userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { AccountView, AuthenView } from './components';

const AccountScreen = ({ navigation }: any) => {
  const version = Constants.expoConfig.version;
  const buildNumber = Constants.expoConfig.ios.buildNumber; // Dành cho iOS
  const versionCode = Constants.expoConfig.android.versionCode;

  const buildNumberDisplay = Platform.select({
    ios: buildNumber,
    android: versionCode.toString(),
  });

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Account"
        navigation={navigation}
        showBackIcon={false}
      />
      {userStore.userProfile ? <AccountView /> : <AuthenView />}
      <Text
        style={{
          ...FONT_STYLES.REGULAR_12,
          paddingVertical: 4,
          textAlign: 'center',
        }}
      >
        Version {version} ({buildNumberDisplay})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(AccountScreen);
export { observable as AccountScreen };
