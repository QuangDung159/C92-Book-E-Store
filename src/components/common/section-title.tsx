import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { FONT_STYLES } from '@themes';

interface SectionTitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, style }) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.BOLD_16,
  },
});

export { SectionTitle };
