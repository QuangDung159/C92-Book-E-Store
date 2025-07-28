import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { UNKNOWN_ERROR_MESSAGE } from '@constants';
import { appModel, authenticationStore, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { delay, ToastHelpers } from '@utils';
import { SignUpViewModel } from './view-models';

const SignUpScreen = ({ navigation }: any) => {
  const signUpVM = useRef(new SignUpViewModel(appModel.userStore)).current;

  const [errorMessageEmail, setErrorMessageEmail] = useState('');

  const onSubmit = async () => {
    Keyboard.dismiss();
    //
    if (signUpVM.hasAnyValidationError) {
      signUpVM.showValidationErrors(true);
      return;
    }

    sharedStore.setShowLoading(true);

    await authenticationStore.signUp(
      signUpVM.toJsonObject,
      async () => {
        navigation.goBack();
        await delay(1000);
        ToastHelpers.showToast({
          title: 'Sign up successfully',
          type: 'success',
        });
      },
      (result) => {
        setErrorMessageEmail(result.errorMessage || UNKNOWN_ERROR_MESSAGE);
      },
    );

    sharedStore.setShowLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sign Up" navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <Text style={styles.desc}>Please fill your details to signup.</Text>
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={signUpVM.email}
          placeholder="Email"
          onChangeText={(value) => {
            signUpVM.setEmail(value);
            setErrorMessageEmail(''); // Reset error message when user types
          }}
          errorMessage={
            errorMessageEmail || signUpVM.validationErrors.get('email')
          }
          shouldShowErrorTitle={
            Boolean(errorMessageEmail) || signUpVM.shouldShowValidationErrors
          }
          keyboardType="email-address"
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signUpVM.username}
          placeholder="Username"
          onChangeText={(value) => {
            signUpVM.setUsername(value);
          }}
          errorMessage={signUpVM.validationErrors.get('username')}
          shouldShowErrorTitle={signUpVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="phone-pad"
          value={signUpVM.phoneNumber}
          placeholder="Phone number"
          onChangeText={(value) => {
            signUpVM.setPhoneNumber(value);
          }}
          errorMessage={signUpVM.validationErrors.get('phoneNumber')}
          shouldShowErrorTitle={signUpVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          secureTextEntry
          value={signUpVM.password}
          placeholder="Password"
          onChangeText={(value) => {
            signUpVM.setPassword(value);
          }}
          errorMessage={signUpVM.validationErrors.get('password')}
          shouldShowErrorTitle={signUpVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          secureTextEntry
          value={signUpVM.confirmPassword}
          placeholder="Confirm password"
          onChangeText={(value) => {
            signUpVM.setConfirmPassword(value);
          }}
          errorMessage={signUpVM.validationErrors.get('confirmPassword')}
          shouldShowErrorTitle={signUpVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign Up"
          buttonType="primary"
          onPress={onSubmit}
        />
        <Layouts.VSpace value={24} />
      </KeyboardAwareScrollView>
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
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: -24,
  },
  desc: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
});

const observable = observer(SignUpScreen);
export { observable as SignUpScreen };
