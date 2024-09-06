import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Buttons, Inputs, Layouts } from '@components';
import { FONT_STYLES } from '@themes';
import { PopupHeader } from 'components/layouts';
import { AddCreditCardViewModel } from '../view-models';

interface AddCreditCardPopupProps {
  visible: boolean;
  onDismiss: () => void;
  onDoneDismiss?: () => void;
}

const AddCreditCardPopup: React.FC<AddCreditCardPopupProps> = ({
  visible,
  onDismiss,
  onDoneDismiss,
}) => {
  const addCreditCardVM = useRef(new AddCreditCardViewModel()).current;

  return (
    <Layouts.BottomPopup visible={visible} onDismiss={onDoneDismiss}>
      <PopupHeader
        label="Add new card"
        onDismiss={() => {
          onDismiss();
        }}
      />
      <View style={styles.contentWrapper}>
        <Inputs.CTextInput
          placeholder="Card number"
          label="Card number"
          onChangeText={(value) => addCreditCardVM.setCardNumber(value)}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Card holder"
          label="Card Holder"
          onChangeText={(value) => addCreditCardVM.setCardHolder(value)}
        />
        <Layouts.VSpace value={24} />
        <Inputs.CTextInput
          placeholder="Expiration date"
          label="Expiration date"
          onChangeText={(value) => addCreditCardVM.setExpirationDate(value)}
        />
        <Layouts.VSpace value={24} />
        <Buttons.CButton
          label="Submit"
          onPress={() => {
            addCreditCardVM.addCreditCard();
            onDismiss();
          }}
          buttonType="primary"
        />
      </View>
      <Layouts.VSpace value={12} />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginLeft: -8,
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
});

const observable = observer(AddCreditCardPopup);
export { observable as AddCreditCardPopup };
