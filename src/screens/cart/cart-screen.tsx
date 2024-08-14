import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { useNavigate } from '@hooks';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { ListCartItem } from './components/list-cart-item';

const CartScreen = ({ navigation }: any) => {
  const { openPaymentScreen } = useNavigate(navigation);

  const cartEmpty = useMemo(
    () => (cartStore.listCartItem || []).length === 0,
    [],
  );

  const renderOrderInfoRow = (
    title: string,
    value: number,
    isTotal?: boolean,
  ) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={[styles.rowTitle, isTotal && styles.rowTitleTotal]}>
          {title}
        </Text>
        <Text style={[styles.rowValue, isTotal && styles.rowValueTotal]}>
          {StringHelpers.formatCurrency(value)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Cart" navigation={navigation} onGoBack={() => {}} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <ListCartItem listItem={cartStore.listCartItem} />
        {!cartEmpty && (
          <>
            <View>
              <Text style={styles.summaryTitle}>Order summary</Text>
              <Layouts.VSpace value={12} />
              {renderOrderInfoRow('Subtotal', cartStore.subTotal)}
              <Layouts.VSpace value={12} />
              {renderOrderInfoRow('Shipping', cartStore.shipping)}
              <Layouts.VSpace value={12} />
              {renderOrderInfoRow('Discount', -cartStore.discount)}
              <Layouts.VSpace value={12} />
              <View style={styles.divider} />
              <Layouts.VSpace value={12} />
              {renderOrderInfoRow('Total', cartStore.total, true)}
            </View>
            <Layouts.VSpace value={24} />
          </>
        )}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <View style={styles.totalWrapper}>
          <Text style={styles.total}>
            {StringHelpers.formatCurrency(cartStore.total)}
          </Text>
          <Buttons.CButton
            onPress={() => {
              openPaymentScreen();
            }}
            label="Checkout"
            buttonType="primary"
            disabled={cartEmpty}
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
  //
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    ...FONT_STYLES.REGULAR_16,
  },
  rowTitleTotal: {
    ...FONT_STYLES.REGULAR_20,
  },
  rowValue: {
    ...FONT_STYLES.BOLD_16,
  },
  rowValueTotal: {
    ...FONT_STYLES.BOLD_20,
  },
  summaryTitle: {
    ...FONT_STYLES.BOLD_20,
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
});

const observable = observer(CartScreen);
export { observable as CartScreen };
