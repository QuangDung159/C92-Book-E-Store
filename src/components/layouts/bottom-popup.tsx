import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '@themes';

const BottomPopup = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn={'fadeInUp'}
      style={{
        margin: 0,
      }}
      animationOut={'fadeOutDown'}
      animationOutTiming={500}
      avoidKeyboard
    >
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <View style={styles.popupContainer}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: COLORS.primaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
});

export { BottomPopup };
