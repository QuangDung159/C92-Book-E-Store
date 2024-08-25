import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenHeader } from '@components';
import { userStore } from '@store';
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
