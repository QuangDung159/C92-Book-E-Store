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
import { authenticationStore, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { AddCreditCardViewModel } from './view-models';

const AddEditPaymentCardScreen = ({ navigation, route }: any) => {
  const paymentCard = route?.params?.paymentCard as DataModels.ICreditCard;

  const addCreditCardVM = useRef(
    new AddCreditCardViewModel(authenticationStore, paymentCard),
  ).current;

  const loadData = async () => {
    sharedStore.setShowLoading(true);
    await authenticationStore.fetchUser();
    sharedStore.setShowLoading(false);
  };

  const onAddEditSuccess = async () => {
    await loadData();
    navigation.goBack();
  };

  const onSubmit = () => {
    if (addCreditCardVM.hasAnyValidationError) {
      addCreditCardVM.showValidationErrors(true);
      return;
    }

    if (paymentCard) {
      addCreditCardVM.updateCreditCard(onAddEditSuccess);
    } else {
      addCreditCardVM.addCreditCard(onAddEditSuccess);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Payment Card Detail" navigation={navigation} />
      <View style={styles.wrapper}>
        <Layouts.VSpace value={24} />
        <Buttons.CSwitch
          value={addCreditCardVM.primary}
          onValueChange={(value) => {
            addCreditCardVM.setPrimary(value);
          }}
          title="Set as default"
          labelStyle={styles.defaultText}
          disabled={paymentCard?.primary}
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
          keyboardType="number-pad"
          errorMessage={addCreditCardVM.validationErrors.get('cardNumber')}
          shouldShowErrorTitle={addCreditCardVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Card holder"
          label="Card Holder"
          onChangeText={(value) => addCreditCardVM.setCardHolder(value)}
          disabled={Boolean(paymentCard)}
          value={addCreditCardVM.cardHolder}
          errorMessage={addCreditCardVM.validationErrors.get('cardHolder')}
          shouldShowErrorTitle={addCreditCardVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Expiration date"
          label="Expiration date"
          onChangeText={(value) => addCreditCardVM.setExpirationDate(value)}
          disabled={Boolean(paymentCard)}
          value={addCreditCardVM.expirationDate}
          keyboardType="number-pad"
          maxLength={4}
          errorMessage={addCreditCardVM.validationErrors.get('expirationDate')}
          shouldShowErrorTitle={addCreditCardVM.shouldShowValidationErrors}
        />
        <Layouts.VSpace value={24} />
        {paymentCard && (
          <>
            <Divider />
            <Layouts.VSpace value={24} />
            <Buttons.CButton
              label="Delete this card"
              onPress={() => {}}
              labelStyle={{
                color: COLORS.error50,
              }}
              style={{
                borderColor: COLORS.error50,
              }}
              disabled={paymentCard.primary}
            />
          </>
        )}
        <Layouts.VSpace value={24} />
      </View>
      <Layouts.MaxSpace />
      <BottomButtonSection
        onPress={async () => onSubmit()}
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
