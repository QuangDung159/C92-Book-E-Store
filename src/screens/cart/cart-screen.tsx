import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { TOP_BOOKS } from '@constants';
import { useNavigate } from '@hooks';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { HorizontalListCard } from 'screens/home/components';
import { ListCartItem } from './components/list-cart-item';

const CartScreen = ({ navigation }: any) => {
  const { openPaymentScreen } = useNavigate(navigation);

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
        <Layouts.Divider />
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
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <View style={styles.totalWrapper}>
          <Text style={styles.total}>
            {StringHelpers.formatCurrency(cartStore.subTotal)}
          </Text>
          <Buttons.CButton
            onPress={() => {
              openPaymentScreen();
            }}
            label="Checkout"
            buttonType="primary"
            disabled={cartStore.cartCount === 0}
          />
        </View>
      </View>
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
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  totalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    ...FONT_STYLES.BOLD_22,
  },
  endCartText: {
    ...FONT_STYLES.SEMIBOLD_12,
    color: COLORS.gray70,
    textAlign: 'center',
  },
});

const observable = observer(CartScreen);
export { observable as CartScreen };
