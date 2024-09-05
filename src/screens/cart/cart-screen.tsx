import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { BottomCheckoutSection, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import { cartStore, searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { HorizontalListCard } from 'screens/home/components';
import { ListCartItem } from './components/list-cart-item';

const CartScreen = ({ navigation }: any) => {
  const { openCheckoutScreen } = useNavigate(navigation);
  const [refreshing, setRefreshing] = useState(false);

  const onFecthCart = async () => {
    await cartStore.fetchCart('66d821f534d631e25f9066e3');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onFecthCart();
    setRefreshing(false);
  };

  useEffect(() => {
    onFecthCart();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={`Cart (${cartStore.cartCount})`}
        navigation={navigation}
        onGoBack={() => {}}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ListCartItem listItem={cartStore.listCartItem} />
        <Divider />
        <Layouts.VSpace value={12} />
        <HorizontalListCard
          listItem={searchStore.listTopBook}
          title="Maybe you will like"
        />
        <Layouts.VSpace value={24} />
        <HorizontalListCard
          listItem={searchStore.listUpcomming}
          title="Viewed"
          showSeeMore={true}
        />
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomCheckoutSection
        onPress={openCheckoutScreen}
        priceDisplay={cartStore.subTotal}
        disabled={cartStore.cartCount === 0}
        priceNotSale={
          cartStore.subPriceNotSale !== cartStore.subTotal
            ? cartStore.subPriceNotSale
            : 0
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },

  endCartText: {
    ...FONT_STYLES.SEMIBOLD_12,
    color: COLORS.gray70,
    textAlign: 'center',
  },
});

const observable = observer(CartScreen);
export { observable as CartScreen };
