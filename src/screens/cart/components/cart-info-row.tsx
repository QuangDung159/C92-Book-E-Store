import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface CartInfoRowProps {
  title: string;
  isTotal?: boolean;
  value: number;
}

const CartInfoRow: React.FC<CartInfoRowProps> = ({ title, isTotal, value }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={[styles.rowTitle, isTotal && styles.rowTitleTotal]}>
        {title}
      </Text>
      <Text style={[styles.rowValue, isTotal && styles.rowValueTotal]}>
        {StringHelpers.formatCurrency(value)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rowTitle: {
    ...FONT_STYLES.REGULAR_16,
  },
  rowTitleTotal: {
    ...FONT_STYLES.REGULAR_20,
  },
  rowValue: {
    ...FONT_STYLES.BOLD_16,
  },
  rowValueTotal: {
    ...FONT_STYLES.BOLD_20,
  },
});

export { CartInfoRow };
