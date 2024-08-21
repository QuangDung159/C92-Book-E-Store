/* eslint-disable import/no-unresolved */
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { FONT_STYLES } from '@themes';

const AuthenView: React.FC = () => {
  const navigation = useNavigation();
  const { openSignInScreen, openSignUpScreen } = useNavigate(navigation);
  const EXPO_PUBLIC_MOMO_PARTNER_CODE =
    Constants?.expoConfig.extra?.EXPO_PUBLIC_MOMO_PARTNER_CODE;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome to E-Store</Text>
        <Text style={styles.welcomeText}>
          EXPO_PUBLIC_MOMO_PARTNER_CODE {EXPO_PUBLIC_MOMO_PARTNER_CODE}
        </Text>
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
            <Icons.GoogleIcon />
            <Layouts.HSpace value={12} />
            <Icons.FacebookIcon />
          </View>
        </View>
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
});

export { AuthenView };
