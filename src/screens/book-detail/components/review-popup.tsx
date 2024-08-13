import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Buttons, Inputs, Layouts } from '@components';
import { PopupHeader } from 'components/layouts';

interface ReviewPopupProps {
  visible: boolean;
  onDismiss: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ visible, onDismiss }) => {
  return (
    <Layouts.BottomPopup visible={visible}>
      <PopupHeader
        label="Leave your review"
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
      <Layouts.VSpace value={24} />
      <Buttons.CButton
        label="Submit"
        onPress={() => {
          onDismiss();
        }}
        buttonType="primary"
      />
      <Layouts.VSpace value={24} />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {},
});

const observable = observer(ReviewPopup);
export { observable as ReviewPopup };
