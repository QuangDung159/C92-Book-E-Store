/* eslint-disable import/no-unresolved */
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { authenticationStore, sharedStore } from '@store';
import { FONT_STYLES } from '@themes';
import { AppVersionText } from './app-version-text';

const AuthenView: React.FC = () => {
  const navigation = useNavigation();
  const { openSignInScreen, openSignUpScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome to E-Store</Text>
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign In"
          onPress={() => {
            openSignInScreen();
          }}
          buttonType="primary"
        />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Sign Up"
          onPress={() => {
            openSignUpScreen();
          }}
          buttonType="secondary"
        />
        <Layouts.VSpace value={24} />
        <View style={styles.SSO}>
          <Text style={styles.continue}>
            -------- or continue with --------
          </Text>
          <Layouts.VSpace value={12} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icons.GoogleIcon
              size={30}
              onPress={async () => {
                sharedStore.setShowLoading(true);
                await authenticationStore.googleSignIn();
                sharedStore.setShowLoading(false);
              }}
            />
            <Layouts.HSpace value={16} />
            <Icons.FacebookIcon
              size={30}
              onPress={async () => {
                sharedStore.setShowLoading(true);
                await authenticationStore.facebookSignIn();
                sharedStore.setShowLoading(false);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.versionWrapper}>
        <AppVersionText />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    ...FONT_STYLES.BOLD_18,
    textAlign: 'center',
  },
  SSO: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  continue: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
  versionWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const observable = observer(AuthenView);
export { observable as AuthenView };
