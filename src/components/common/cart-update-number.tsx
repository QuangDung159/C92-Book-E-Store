import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Icons } from '@components';
import { DataModels } from '@models';
import { cartStore, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface CartUpdateNumberProps {
  itemCount: number;
  containerStyle?: StyleProp<ViewStyle>;
  bookCartItem: DataModels.ICartItem;
}

const CartUpdateNumber: React.FC<CartUpdateNumberProps> = ({
  itemCount,
  containerStyle,
  bookCartItem,
}) => {
  return (
    <View style={[styles.addToCartWrapper, containerStyle]}>
      <View style={styles.addToCartWrapper}>
        <View style={styles.addToCart}>
          <Icons.MinusIcon
            color={COLORS.primaryWhite}
            onPress={() => {
              cartStore.adjustCartItemCount(bookCartItem, -1);
            }}
            disabled={itemCount <= 1 || sharedStore.buttonLoading}
          />
          <Text style={styles.cartNumber}>{itemCount}</Text>
          <Icons.PlusIcon
            disabled={
              itemCount >= bookCartItem.book.stock || sharedStore.buttonLoading
            }
            color={COLORS.primaryWhite}
            onPress={() => {
              cartStore.adjustCartItemCount(bookCartItem, 1);
            }}
          />
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
