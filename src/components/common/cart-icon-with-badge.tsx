import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { cartStore } from '@store';
import { COLORS } from '@themes';

interface CartIconWithBadge {
  containerStyle?: StyleProp<ViewStyle>;
}

const CartIconWithBadge: React.FC<CartIconWithBadge> = ({ containerStyle }) => {
  const navigation = useNavigation();
  const { openCartScreen } = useNavigate(navigation);

  return (
    <>
      <Layouts.HSpace value={8} />
      <Icons.CartIcon
        onPress={() => {
          openCartScreen();
        }}
      />
      {cartStore.count > 0 ? (
        <View style={[styles.cartIconContainer, containerStyle]}>
          <Text style={styles.cartNumber}>
            {cartStore.count <= 99 ? cartStore.count : '99+'}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 99,
    minHeight: 16,
    minWidth: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartNumber: {
    color: COLORS.primaryWhite,
    fontSize: 8,
    paddingHorizontal: 2,
    fontWeight: 'bold',
  },
});

export { CartIconWithBadge };
