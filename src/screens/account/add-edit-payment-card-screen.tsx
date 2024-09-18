import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  BottomButtonSection,
  Buttons,
  Inputs,
  Layouts,
  ScreenHeader,
} from '@components';
import { DataModels } from '@models';
import { authenticationStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { AddCreditCardViewModel } from './view-models';

const AddEditPaymentCardScreen = ({ navigation, route }: any) => {
  const paymentCard = route?.params?.paymentCard as DataModels.ICreditCard;

  const addCreditCardVM = useRef(
    new AddCreditCardViewModel(authenticationStore, paymentCard),
  ).current;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Payment Card Detail" navigation={navigation} />
      <View style={styles.wrapper}>
        <Layouts.VSpace value={24} />
        <Buttons.CSwitch
          value={addCreditCardVM.default}
          onValueChange={(value) => {
            addCreditCardVM.setDefault(value);
          }}
          title="Set as default"
          labelStyle={styles.defaultText}
          disabled={paymentCard?.default}
        />
        <Layouts.VSpace value={12} />
        <Divider />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Card number"
          label="Card number"
          onChangeText={(value) => addCreditCardVM.setCardNumber(value)}
          value={addCreditCardVM.cardNumber}
          disabled={Boolean(paymentCard)}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Card holder"
          label="Card Holder"
          onChangeText={(value) => addCreditCardVM.setCardHolder(value)}
          disabled={Boolean(paymentCard)}
          value={addCreditCardVM.cardHolder}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Expiration date"
          label="Expiration date"
          onChangeText={(value) => addCreditCardVM.setExpirationDate(value)}
          disabled={Boolean(paymentCard)}
          value={addCreditCardVM.expirationDate}
        />
      </View>
      <Layouts.MaxSpace />
      <BottomButtonSection
        onPress={() => {
          if (userStore.authenticated) {
            addCreditCardVM.addCreditCard(userStore.userProfile?.id);
          }
        }}
        buttonTitle="Submit"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
  defaultText: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
});

const observable = observer(AddEditPaymentCardScreen);
export { observable as AddEditPaymentCardScreen };
