import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT_STYLES } from '@themes';

interface InfoRowProps {
  title: string;
  value: string;
  hasCheckBox?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  row: {
    flex: 1,
  },
  title: {
    ...FONT_STYLES.SEMIBOLD_14,
    lineHeight: 20,
  },
  value: {
    ...FONT_STYLES.REGULAR_14,
    lineHeight: 20,
  },
});

export { InfoRow };
