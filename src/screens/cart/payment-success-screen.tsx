import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { cartStore, notificationStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

const PaymentSuccessScreen = ({ navigation }) => {
  const { openHomeScreen } = useNavigate(navigation);

  useEffect(() => {
    cartStore.fetchCart(userStore.userProfile.id);
    userStore.fetchListOrder('created');
    notificationStore.loadNotification();
    cartStore.clearAllCurrentPaymentInfo();
    cartStore.markVoucherWasUsed();
  }, []);

  return (
    <View style={styles.container}>
      <Icons.CheckSquareIcon size={100} />
      <Layouts.VSpace value={12} />
      <Text style={styles.desc}>{`Your order has been created.`}</Text>
      <Layouts.VSpace value={12} />
      <Buttons.CButton
        label="Back to Home"
        onPress={() => {
          openHomeScreen();
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
    ...FONT_STYLES.SEMIBOLD_16,
    textAlign: 'center',
  },
});

const observable = observer(PaymentSuccessScreen);
export { observable as PaymentSuccessScreen };
