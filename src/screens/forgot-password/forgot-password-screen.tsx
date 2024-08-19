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
import { authenticationStore, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { ToastHelpers } from '@utils';
import { ForgotPasswordViewModel } from './view-models';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const forgotPasswordVM = useRef(new ForgotPasswordViewModel()).current;
  const { width, height } = Dimensions.get('window');

  const onSubmitSendCode = async () => {
    Keyboard.dismiss();
    //
    if (forgotPasswordVM.hasAnyValidationError) {
      forgotPasswordVM.showValidationErrors(true);
      return;
    }

    sharedStore.setShowLoading(true);

    await authenticationStore.sendVerificationCode({
      onSuccess: () => {
        ToastHelpers.showToast({
          content: 'Please check your email to get temporary password',
        });
      },
      onFail: () => {
        ToastHelpers.showToast({
          content: 'Your email not exist, please check again',
          type: 'error',
        });
      },
      params: {
        email: forgotPasswordVM.email,
      },
    });

    sharedStore.setShowLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Forgot Password" navigation={navigation} />
      <View
        style={[
          styles.wrapper,
          {
            width: width - 48,
            top: height * 0.3,
          },
        ]}
      >
        <Text style={styles.welcomeText}>Please fill your email</Text>
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={forgotPasswordVM.email}
          placeholder="Enter email"
          onChangeText={(value) => {
            forgotPasswordVM.setEmail(value);
          }}
          errorMessage={forgotPasswordVM.validationErrors.get('email')}
          shouldShowErrorTitle={forgotPasswordVM.shouldShowValidationErrors}
          keyboardType="email-address"
        />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Send temporary password"
          buttonType="primary"
          onPress={() => {
            onSubmitSendCode();
          }}
        />
        <Layouts.VSpace value={12} />
        <TouchableOpacity onPress={() => onSubmitSendCode()}>
          <Text style={styles.resend}>
            Not received verification code, resend
          </Text>
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
  resend: {
    ...FONT_STYLES.REGULAR_14,
    textAlign: 'center',
  },
});

const observable = observer(ForgotPasswordScreen);
export { observable as ForgotPasswordScreen };
