import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import {
  appModel,
  authenticationStore,
  cartStore,
  notificationStore,
  sharedStore,
  userStore,
} from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { SignInViewModel } from './view-models';

const SignInScreen = ({ navigation }: any) => {
  const signInVM = useRef(new SignInViewModel(appModel.userStore)).current;
  const { openForgotPasswordScreen } = useNavigate(navigation);
  const { width, height } = Dimensions.get('window');

  const onSubmit = async () => {
    Keyboard.dismiss();
    //
    if (signInVM.hasAnyValidationError) {
      signInVM.showValidationErrors(true);
      return;
    }

    sharedStore.setShowLoading(true);
    await authenticationStore.signIn(
      signInVM.username,
      signInVM.password,
      notificationStore.expoPushToken,
      () => {
        navigation.goBack();
      },
    );

    if (userStore.authenticated) {
      await cartStore.fetchCart(userStore.userProfile.id);
    }
    sharedStore.setShowLoading(false);
  };

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
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signInVM.username}
          placeholder="Enter username"
          onChangeText={(value) => {
            signInVM.setUsername(value);
          }}
          errorMessage={signInVM.validationErrors.get('username')}
          shouldShowErrorTitle={signInVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signInVM.password}
          placeholder="Enter password"
          onChangeText={(value) => {
            signInVM.setPassword(value);
          }}
          errorMessage={signInVM.validationErrors.get('password')}
          shouldShowErrorTitle={signInVM.shouldShowValidationErrors}
          secureTextEntry
          clearButtonMode="never"
        />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign In"
          buttonType="primary"
          onPress={async () => {
            onSubmit();
          }}
        />
        <Layouts.VSpace value={12} />
        <TouchableOpacity
          onPress={() => {
            openForgotPasswordScreen();
          }}
        >
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
    ...FONT_STYLES.SEMIBOLD_14,
    textAlign: 'center',
  },
});

const observable = observer(SignInScreen);
export { observable as SignInScreen };
