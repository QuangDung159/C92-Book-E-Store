import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Badge } from 'react-native-paper';
import { Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { cartStore } from '@store';

interface CartIconWithBadge {
  containerStyle?: StyleProp<ViewStyle>;
}

const CartIconWithBadge: React.FC<CartIconWithBadge> = ({ containerStyle }) => {
  const navigation = useNavigation();
  const { openCartScreen } = useNavigate(navigation);

  const badgeNumber = useMemo(() => {
    if (cartStore.cartCount > 0 && cartStore.cartCount <= 99) {
      return cartStore.cartCount;
    } else {
      return '99+';
    }
  }, []);

  return (
    <>
      <Layouts.HSpace value={8} />
      <Icons.CartIcon
        onPress={() => {
          openCartScreen();
        }}
      />
      {cartStore.cartCount > 0 ? (
        <View style={[styles.cartIconContainer, containerStyle]}>
          <Badge>{badgeNumber}</Badge>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'absolute',
    bottom: 15,
    left: 40,
    borderRadius: 99,
    minHeight: 16,
    minWidth: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const observable = observer(CartIconWithBadge);
export { observable as CartIconWithBadge };
