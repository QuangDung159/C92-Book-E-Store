import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface AddToCartButtonProps {
  itemCount: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ itemCount }) => {
  return (
    <>
      <View style={styles.addToCartWrapper}>
        <View style={styles.addToCart}>
          <Icons.MinusIcon color={COLORS.primaryWhite} />
          <Text style={styles.cartNumber}>{itemCount}</Text>
          <Icons.PlusIcon color={COLORS.primaryWhite} />
        </View>
      </View>
      <Layouts.HSpace value={8} />
      <View style={styles.cartIconWrapper}>
        <Icons.CartIcon color={COLORS.primaryWhite} />
      </View>
    </>
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
  cartIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
  },
});

export { AddToCartButton };
