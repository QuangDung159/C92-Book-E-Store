import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONT_STYLES } from '@themes';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.SEMIBOLD_20,
  },
});

export { SectionTitle };
