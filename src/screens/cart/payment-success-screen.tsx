import { observer } from 'mobx-react-lite';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

const PaymentSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Icons.CheckSquareIcon size={150} />
      <Layouts.VSpace value={12} />
      <Text style={styles.success}>Payment success!</Text>
      <Layouts.VSpace value={8} />
      <Text style={styles.desc}>Your order has been validated.</Text>
      <Layouts.VSpace value={12} />
      <Buttons.CButton
        label="Back to Home"
        onPress={() => {
          Linking.openURL('exp://192.168.68.122:8081/--/home');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  success: {
    ...FONT_STYLES.BOLD_18,
  },
  desc: {
    ...FONT_STYLES.REGULAR_16,
  },
});

const observable = observer(PaymentSuccessScreen);
export { observable as PaymentSuccessScreen };
