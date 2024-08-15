import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { BottomCheckoutSection, Layouts, ScreenHeader } from '@components';
import { TOP_BOOKS } from '@constants';
import { useNavigate } from '@hooks';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { HorizontalListCard } from 'screens/home/components';
import { ListCartItem } from './components/list-cart-item';

const CartScreen = ({ navigation }: any) => {
  const { openCheckoutScreen } = useNavigate(navigation);

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
      >
        <ListCartItem listItem={cartStore.listCartItem} />
        <Divider />
        <Layouts.VSpace value={12} />
        <HorizontalListCard listItem={TOP_BOOKS} title="Maybe you will like" />
        <Layouts.VSpace value={24} />
        <HorizontalListCard
          listItem={TOP_BOOKS}
          title="Viewed"
          showSeeMore={true}
        />
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomCheckoutSection
        onPress={openCheckoutScreen}
        priceDisplay={cartStore.subTotal}
        disabled={cartStore.cartCount === 0}
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
