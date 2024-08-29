import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ScreenHeader } from '@components';
import { authenticationStore, userStore } from '@store';
import { COLORS } from '@themes';
import { AccountView, AuthenView } from './components';

const AccountScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Account"
        navigation={navigation}
        showBackIcon={false}
      />
      {userStore.userProfile ? <AccountView /> : <AuthenView />}
      {/* <TestZalo /> */}
      {userStore?.userProfile ? (
        <Button
          title="google sign out"
          onPress={() => {
            authenticationStore.googleSignOut();
          }}
        ></Button>
      ) : (
        <Button
          title="google"
          onPress={() => {
            authenticationStore.googleSignIn();
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
