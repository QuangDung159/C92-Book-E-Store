import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface BookCardPriceProps {
  price: number;
  style?: StyleProp<TextStyle>;
}

const BookCardPrice: React.FC<BookCardPriceProps> = ({ price, style }) => {
  return (
    <Text style={[styles.price, style]}>
      {StringHelpers.formatCurrency(price)}
    </Text>
  );
};

const styles = StyleSheet.create({
  price: {
    ...FONT_STYLES.SEMIBOLD_18,
  },
});

export { BookCardPrice };
