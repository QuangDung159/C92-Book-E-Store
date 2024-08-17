import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { USER } from '@constants';
import { useNavigate } from '@hooks';
import { appModel, sharedStore } from '@store';
import { COLORS } from '@themes';
import { delay, ToastHelpers } from '@utils';

const AccountScreen = ({ navigation }: any) => {
  const { openHomeScreen, openAddressScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Account"
        navigation={navigation}
        showBackIcon={false}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Buttons.CButton
          label="Login"
          onPress={() => {
            sharedStore.setShowLoading(true);
            delay(1000).then(() => {
              ToastHelpers.showToast({
                title: 'Login success',
              });
              sharedStore.setShowLoading(false);
              appModel.login(USER);
              openHomeScreen();
            });
          }}
        />
        <Layouts.VSpace value={12} />
        <Buttons.CButton label="Address" onPress={openAddressScreen} />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Logout"
          onPress={() => {
            sharedStore.setShowLoading(true);
            delay(1000).then(() => {
              ToastHelpers.showToast({
                title: 'Logout success',
              });
              sharedStore.setShowLoading(false);
              appModel.logout();
              openHomeScreen();
            });
          }}
        />
      </View>
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
