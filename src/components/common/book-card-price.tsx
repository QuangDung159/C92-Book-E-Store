import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface BookCardPriceProps {
  price: number;
  priceNotSale: number;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardPrice: React.FC<BookCardPriceProps> = ({
  price,
  style,
  priceNotSale,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {Boolean(priceNotSale) && (
        <Text style={styles.priceNotSale}>
          {StringHelpers.formatCurrency(priceNotSale)}
        </Text>
      )}
      <Text style={[styles.price, style]}>
        {StringHelpers.formatCurrency(price)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'column' },
  price: {
    ...FONT_STYLES.SEMIBOLD_18,
  },
  priceNotSale: {
    ...FONT_STYLES.REGULAR_14,
    textDecorationLine: 'line-through',
    color: COLORS.gray60,
  },
});

export { BookCardPrice };
