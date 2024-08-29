import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScreenHeader } from '@components';
import { sharedStore, userStore } from '@store';
import { COLORS } from '@themes';
import { GoogleUser } from '@types';
import { AccountView, AuthenView } from './components';

const AccountScreen = ({ navigation }: any) => {
  const [googleUser, setGoogleUser] = useState<GoogleUser>(null);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({ userInfo, error: undefined });
      setGoogleUser(userInfo);
    } catch (error) {
      console.log('error :>> ', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    sharedStore.setShowLoading(true);
    const result = await GoogleSignin.signOut();
    console.log('result :>> ', result);
    sharedStore.setShowLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Account"
        navigation={navigation}
        showBackIcon={false}
      />
      {userStore.userProfile ? <AccountView /> : <AuthenView />}
      {/* <TestZalo /> */}
      {googleUser?.user ? (
        <Button
          title="google sign out"
          onPress={() => {
            signOut();
          }}
        ></Button>
      ) : (
        <Button
          title="google"
          onPress={() => {
            _signIn();
          }}
        ></Button>
      )}
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
