import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Icons } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface CartUpdateNumberProps {
  itemCount: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const CartUpdateNumber: React.FC<CartUpdateNumberProps> = ({
  itemCount,
  containerStyle,
}) => {
  return (
    <View style={[styles.addToCartWrapper, containerStyle]}>
      <View style={styles.addToCartWrapper}>
        <View style={styles.addToCart}>
          <Icons.MinusIcon color={COLORS.primaryWhite} />
          <Text style={styles.cartNumber}>{itemCount}</Text>
          <Icons.PlusIcon color={COLORS.primaryWhite} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addToCartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 40,
    width: 120,
    justifyContent: 'space-between',
  },
  cartNumber: {
    ...FONT_STYLES.SEMIBOLD_16,
    paddingHorizontal: 8,
    color: COLORS.primaryWhite,
  },
});

export { CartUpdateNumber };
