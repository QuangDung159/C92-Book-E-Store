import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { COLORS, FONT_STYLES } from '@themes';
import { AuthenViewModel } from './view-models';

const SignUpScreen = ({ navigation }: any) => {
  const signInVM = useRef(new AuthenViewModel()).current;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Sign Up" navigation={navigation} />
      <View
        style={{
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
          onPress={() => {}}
        />
        <Layouts.VSpace value={12} />
        <TouchableOpacity>
          <Text
            style={{
              ...FONT_STYLES.REGULAR_14,
              textAlign: 'center',
            }}
          >
            Forgot password
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
});

const observable = observer(SignUpScreen);
export { observable as SignUpScreen };
