import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import { appModel, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { SignInViewModel } from './view-models';

const SignInScreen = ({ navigation }: any) => {
  const signInVM = useRef(new SignInViewModel(appModel.userStore)).current;
  const { openHomeScreen } = useNavigate(navigation);
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sign In" navigation={navigation} />
      <View
        style={[
          styles.wrapper,
          {
            width: width - 48,
            top: height * 0.3,
          },
        ]}
      >
        <Text style={styles.welcomeText}>
          Please fill your details to login.
        </Text>
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={signInVM.email}
          placeholder="Enter email"
          onChangeText={(value) => {
            signInVM.setEmail(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="visible-password"
          value={signInVM.password}
          placeholder="Enter password"
          onChangeText={(value) => {
            signInVM.setPassword(value);
          }}
        />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign In"
          buttonType="primary"
          onPress={async () => {
            sharedStore.setShowLoading(true);
            await signInVM.login();
            sharedStore.setShowLoading(false);
            openHomeScreen();
          }}
        />
        <Layouts.VSpace value={12} />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  wrapper: {
    flex: 1,
    position: 'absolute',
    left: 24,
  },
  welcomeText: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
  forgotPassword: {
    ...FONT_STYLES.REGULAR_14,
    textAlign: 'center',
  },
});

const observable = observer(SignInScreen);
export { observable as SignInScreen };
