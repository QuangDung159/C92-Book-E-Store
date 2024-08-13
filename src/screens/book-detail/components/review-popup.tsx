import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Inputs, Layouts } from '@components';
import { PopupHeader } from 'components/layouts';

interface ReviewPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ visible, onDismiss }) => {
  return (
    <Layouts.BottomPopup visible={visible}>
      <PopupHeader
        label="Sort"
        onDismiss={() => {
          onDismiss();
        }}
      />
      <View style={styles.contentWrapper}>
        <Inputs.CTextInput
          label="Your name *"
          placeholder="Please enter your name"
        />
        <Layouts.VSpace value={16} />
        <Inputs.CTextInput multiline label="Your name *" />
      </View>
      <Layouts.VSpace value={12} />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {},
});

const observable = observer(ReviewPopup);
export { observable as ReviewPopup };
