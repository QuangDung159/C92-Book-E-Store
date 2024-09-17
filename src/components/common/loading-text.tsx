import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_STYLES } from '@themes';

interface LoadingTextProps {
  text?: string;
}

const LoadingText: React.FC<LoadingTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text || 'Loading...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...FONT_STYLES.SEMIBOLD_14,
    color: COLORS.gray50,
    marginVertical: 24,
  },
});

export { LoadingText };
