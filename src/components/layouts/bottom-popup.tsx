import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '@themes';

const BottomPopup = ({
  visible,
  children,
  onDismiss,
}: {
  visible: boolean;
  children: React.ReactNode;
  onDismiss?: () => void;
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
      onDismiss={() => onDismiss?.()}
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        <View style={styles.popupContainer}>{children}</View>
      </ScrollView>
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
    borderRadius: 20,
    padding: 24,
  },
});

export { BottomPopup };
