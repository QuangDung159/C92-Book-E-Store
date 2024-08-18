import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { USER } from '@constants';
import { useNavigate } from '@hooks';
import { appModel, authenticationStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { SignUpViewModel } from './view-models';

const SignUpScreen = ({ navigation }: any) => {
  const signUpVM = useRef(new SignUpViewModel(appModel.userStore)).current;
  const { openHomeScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sign Up" navigation={navigation} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
          marginTop: -24,
        }}
      >
        <Text
          style={{
            ...FONT_STYLES.SEMIBOLD_14,
          }}
        >
          Please fill your details to signup.
        </Text>
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          value={signUpVM.email}
          placeholder="Email"
          onChangeText={(value) => {
            signUpVM.setEmail(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signUpVM.username}
          placeholder="Username"
          onChangeText={(value) => {
            signUpVM.setUsername(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="phone-pad"
          value={signUpVM.phoneNumber}
          placeholder="Phone number"
          onChangeText={(value) => {
            signUpVM.setPhoneNumber(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          secureTextEntry
          value={signUpVM.password}
          placeholder="Password"
          onChangeText={(value) => {
            signUpVM.setPassword(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          secureTextEntry
          value={signUpVM.confirmPassword}
          placeholder="Confirm password"
          onChangeText={(value) => {
            signUpVM.setConfirmPassword(value);
          }}
        />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign Up"
          buttonType="primary"
          onPress={async () => {
            await authenticationStore.signIn({
              ...USER,
              email: signUpVM.email,
              username: signUpVM.username,
              password: signUpVM.password,
              phoneNumber: signUpVM.phoneNumber,
            });

            openHomeScreen();
          }}
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
});

const observable = observer(SignUpScreen);
export { observable as SignUpScreen };
