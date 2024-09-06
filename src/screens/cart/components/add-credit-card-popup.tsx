import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layouts } from '@components';
import { FONT_STYLES } from '@themes';
import { PopupHeader } from 'components/layouts';

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
  return (
    <Layouts.BottomPopup visible={visible} onDismiss={onDoneDismiss}>
      <PopupHeader
        label="Sort"
        onDismiss={() => {
          onDismiss();
        }}
      />
      <View style={styles.contentWrapper}>
        <Text>asd</Text>
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
