import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { cartStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { ToastHelpers } from '@utils';

interface AddToCartButtonProps {
  itemCount: number;
  containerStyle?: StyleProp<ViewStyle>;
  buttonType?: 'icon' | 'text-icon';
  onUpdateCount?: (countNumber: number) => void;
  bookCardItem: DataModels.IBook;
  showCount?: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  itemCount,
  containerStyle,
  buttonType = 'icon',
  onUpdateCount,
  bookCardItem,
  showCount = true,
}) => {
  const navigation = useNavigation();
  const { openCartScreen, openSignInScreen } = useNavigate(navigation);

  const onAddToCart = () => {
    if (!userStore.authenticated) {
      ToastHelpers.showToast({
        title: 'Please sign in first',
        type: 'error',
        onPress: () => {
          openSignInScreen();
        },
      });
      return;
    }

    cartStore.addToCart({
      book: bookCardItem,
      count: itemCount,
    });

    ToastHelpers.showToast({
      title: 'Add to cart success',
      content: 'View cart',
      onPress: () => openCartScreen(),
    });
  };

  return (
    <View style={[styles.addToCartWrapper, containerStyle]}>
      {showCount && (
        <>
          <View style={styles.addToCart}>
            <Icons.MinusIcon
              disabled={itemCount === 1}
              onPress={() => onUpdateCount?.(itemCount - 1)}
              color={COLORS.primaryWhite}
            />
            <Text style={styles.cartNumber}>{itemCount}</Text>
            <Icons.PlusIcon
              onPress={() => {
                onUpdateCount?.(itemCount + 1);
              }}
              disabled={itemCount >= bookCardItem.stock}
              color={COLORS.primaryWhite}
            />
          </View>
          <Layouts.HSpace value={8} />
        </>
      )}
      {buttonType === 'icon' ? (
        <View style={styles.cartIconWrapper}>
          <Icons.CartIcon color={COLORS.primaryWhite} onPress={onAddToCart} />
        </View>
      ) : (
        <Buttons.CButton
          onPress={onAddToCart}
          buttonType="primary"
          label="Add to cart"
          style={{
            borderRadius: 8,
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
