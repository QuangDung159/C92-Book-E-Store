import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { NotificationServices } from '@services';
import { COLORS, FONT_STYLES } from '@themes';

const PaymentSuccessScreen = ({ navigation, route }) => {
  const { openHomeScreen } = useNavigate(navigation);

  const orderId = route.params?.orderId;
  const message = route.params?.message;

  useEffect(() => {
    if (orderId) {
      NotificationServices.sendPushNotification({
        body: `Your order #${orderId} has been confirmed.`,
        title: 'Order status',
        data: {
          orderId,
          message,
        },
      });
    }
  }, [message, orderId]);

  return (
    <View style={styles.container}>
      <Icons.CheckSquareIcon size={150} />
      <Layouts.VSpace value={12} />
      <Text style={styles.success}>{`${message}`}</Text>
      <Layouts.VSpace value={8} />
      <Text
        style={styles.desc}
      >{`Your order \n${orderId}\nhas been confirmed.`}</Text>
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
    paddingHorizontal: 24,
  },
  success: {
    ...FONT_STYLES.BOLD_18,
  },
  desc: {
    ...FONT_STYLES.SEMIBOLD_14,
    textAlign: 'center',
  },
});

const observable = observer(PaymentSuccessScreen);
export { observable as PaymentSuccessScreen };
