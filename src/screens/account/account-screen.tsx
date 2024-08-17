import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Inputs, Layouts, ScreenHeader } from '@components';
import { COLORS, FONT_STYLES } from '@themes';
import { SignInViewModel } from './view-models';

const AccountScreen = ({ navigation }: any) => {
  const signInVM = useRef(new SignInViewModel()).current;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Account"
        navigation={navigation}
        showBackIcon={false}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            ...FONT_STYLES.BOLD_18,
            textAlign: 'center',
          }}
        >
          Welcome to E-Store
        </Text>
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Sign In"
          onPress={() => {}}
          buttonType="primary"
        />
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          label="Sign Up"
          onPress={() => {}}
          buttonType="secondary"
        />
        <Layouts.VSpace value={24} />
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_14,
            }}
          >
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
    backgroundColor: COLORS.primaryWhite,
  },
});

const observable = observer(AccountScreen);
export { observable as AccountScreen };
