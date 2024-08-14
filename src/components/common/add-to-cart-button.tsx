import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { cartStore, searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface AddToCartButtonProps {
  itemCount: number;
  containerStyle?: StyleProp<ViewStyle>;
  buttonType?: 'icon' | 'text-icon';
  onUpdateCount?: (countNumber: number) => void;
  bookCardItem: DataModels.IBook;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  itemCount,
  containerStyle,
  buttonType = 'icon',
  onUpdateCount,
  bookCardItem,
}) => {
  return (
    <View style={[styles.addToCartWrapper, containerStyle]}>
      <View style={styles.addToCartWrapper}>
        <View style={styles.addToCart}>
          <Icons.MinusIcon
            disabled={itemCount === 1}
            onPress={() => onUpdateCount(-1)}
            color={COLORS.primaryWhite}
          />
          <Text style={styles.cartNumber}>{itemCount}</Text>
          <Icons.PlusIcon
            onPress={() => onUpdateCount(1)}
            disabled={itemCount >= bookCardItem.stock}
            color={COLORS.primaryWhite}
          />
        </View>
      </View>
      <Layouts.HSpace value={8} />
      {buttonType === 'icon' ? (
        <View style={styles.cartIconWrapper}>
          <Icons.CartIcon
            color={COLORS.primaryWhite}
            onPress={() => {
              cartStore.addToCart({
                book: bookCardItem,
                count: bookCardItem.count,
              });

              searchStore.updateBookItem({
                ...bookCardItem,
                count: 1,
              });
            }}
          />
        </View>
      ) : (
        <Buttons.CButton
          onPress={() => {}}
          buttonType="primary"
          label="Add to cart"
          style={{
            borderRadius: 50,
          }}
          iconLeft={() => <Icons.CartIcon color={COLORS.primaryWhite} />}
        />
      )}
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
