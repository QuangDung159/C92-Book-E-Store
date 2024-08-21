import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { FONT_STYLES } from '@themes';

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
        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>
          This is Montserrat Bold
        </Text>
        <Text style={{ ...FONT_STYLES.REGULAR_16 }}>
          This is Montserrat Bold
        </Text>
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
