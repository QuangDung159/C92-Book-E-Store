/* eslint-disable import/no-unresolved */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { authenticationStore, sharedStore } from '@store';
import { FONT_STYLES } from '@themes';
import { AppVersionText } from './app-version-text';

const AuthenView: React.FC = () => {
  const navigation = useNavigation();
  const { openSignInScreen, openSignUpScreen } = useNavigate(navigation);

  const FacebookSignIn = () => {
    const handleFacebookLogin = async () => {
      try {
        const loginResult = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);

        if (!loginResult.isCancelled) {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            const token = data?.accessToken;
            const response = await fetch(
              `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${token}`,
            );
            const result = await response.json();
            console.log('result :>> ', result);
          });
        }
      } catch (error) {
        console.error('Facebook login failed', error);
      }
    };

    return <Button title="Login with Facebook" onPress={handleFacebookLogin} />;
  };

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
              onPress={async () => {
                sharedStore.setShowLoading(true);
                await authenticationStore.googleSignIn();
                sharedStore.setShowLoading(false);
              }}
            />
            <Layouts.HSpace value={12} />
            <Icons.FacebookIcon />
          </View>
        </View>
      </View>
      {FacebookSignIn()}
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

export { AuthenView };
