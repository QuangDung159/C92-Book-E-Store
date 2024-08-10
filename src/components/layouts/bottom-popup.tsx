import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const BottomPopup = ({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      });
    }
  }, [slideAnim, visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.popupContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {children}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { BottomPopup };
