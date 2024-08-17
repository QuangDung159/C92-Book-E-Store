import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { appModel } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { SignInViewModel } from './view-models';

const SignUpScreen = ({ navigation }: any) => {
  const signInVM = useRef(new SignInViewModel(appModel.userStore)).current;

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
          value={signInVM.email}
          placeholder="Username"
          onChangeText={(value) => {
            signInVM.setEmail(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signInVM.email}
          placeholder="Phone number"
          onChangeText={(value) => {
            signInVM.setEmail(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          value={signInVM.email}
          placeholder="Email"
          onChangeText={(value) => {
            signInVM.setEmail(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="visible-password"
          value={signInVM.password}
          placeholder="Password"
          onChangeText={(value) => {
            signInVM.setPassword(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          keyboardType="visible-password"
          value={signInVM.password}
          placeholder="Confirm password"
          onChangeText={(value) => {
            signInVM.setPassword(value);
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
          label="Sign Up"
          buttonType="primary"
          onPress={() => {}}
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
