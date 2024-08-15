import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons } from '@components';
import { useNavigate } from '@hooks';
import { COLORS } from '@themes';

const PaymentSuccessScreen = ({ navigation }) => {
  const { openHomeScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <Text>Payment success</Text>
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
  },
});

const observable = observer(PaymentSuccessScreen);
export { observable as PaymentSuccessScreen };
