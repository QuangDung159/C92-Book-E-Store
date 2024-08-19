import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '@themes';

interface DividerProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({ containerStyle }) => {
  return <View style={[styles.divider, containerStyle]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
});

export { Divider };
