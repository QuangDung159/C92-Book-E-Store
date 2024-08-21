import { observer } from 'mobx-react-lite';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { COLORS, FONT_STYLES } from '@themes';

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { openHomeScreen } = useNavigate(navigation);

  const orderId = route.params?.orderId;

  return (
    <View style={styles.container}>
      <Icons.CheckSquareIcon size={150} />
      <Layouts.VSpace value={12} />
      <Text style={styles.success}>Payment success!</Text>
      <Layouts.VSpace value={8} />
      <Text
        style={styles.desc}
      >{`Your order #${orderId} has been confirmed.`}</Text>
      <Layouts.VSpace value={12} />
      <Buttons.CButton
        label="Back to Home"
        onPress={() => {
          if (Linking.canOpenURL('c92bookestorev1:///home')) {
            Linking.openURL('c92bookestorev1:///home');
          } else {
            openHomeScreen();
          }
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
