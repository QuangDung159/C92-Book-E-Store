import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { UNKNOWN_ERROR_MESSAGE } from '@constants';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
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
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async () => {
    Keyboard.dismiss();
    //
    if (signInVM.hasAnyValidationError) {
      signInVM.showValidationErrors(true);
      return;
    }

    const signInParam: DataModels.ISignInParams = {
      email: signInVM.username,
      password: signInVM.password,
      notificationToken: notificationStore.expoPushToken,
      signInMethod: 'in-app',
      ssoToken: 'in-app',
    };

    sharedStore.setShowLoading(true);
    await authenticationStore.signIn(
      signInParam,
      () => {
        navigation.goBack();
      },
      (error) => {
        setErrorMessage(error?.errorMessage || UNKNOWN_ERROR_MESSAGE);
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
          placeholder="Enter email"
          onChangeText={(value) => {
            signInVM.setUsername(value);
            setErrorMessage('');
          }}
          errorMessage={signInVM.validationErrors.get('username')}
          shouldShowErrorTitle={signInVM.shouldShowValidationErrors}
          keyboardType="email-address"
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
          onPress={onSubmit}
        />
        <Layouts.VSpace value={12} />
        <TouchableOpacity
          onPress={() => {
            openForgotPasswordScreen();
          }}
        >
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>
        <Layouts.VSpace value={24} />
        <View>
          <Text
            style={[
              styles.forgotPassword,
              {
                color: COLORS.error50,
              },
            ]}
          >
            {errorMessage}
          </Text>
        </View>
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
