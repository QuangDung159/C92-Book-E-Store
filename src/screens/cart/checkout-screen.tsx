/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { RadioButton } from 'react-native-paper';
import { Buttons, Icons, Layouts, ScreenHeader } from '@components';
import { LIST_PAYMENT_METHOD, PAYMENT_TYPE } from '@constants';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { CartInfoRow, ListCreditCard, SectionTitle } from './components';
import { ListCartItem } from './components/list-cart-item';

const PaymentScreen = ({ navigation }: any) => {
  const [isShowListCreditCart, setIsShowListCreditCart] = useState(false);
  const toggleListCreditCart = () =>
    setIsShowListCreditCart(!isShowListCreditCart);

  const listCreditCard = useMemo(
    () => cartStore.userStore.userProfile?.listCreditCard || [],
    [],
  );

  useEffect(() => {
    setIsShowListCreditCart(
      cartStore.paymentSelected.paymentType === PAYMENT_TYPE.creditCard,
    );
  }, [cartStore.paymentSelected.paymentType]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Checkout"
        navigation={navigation}
        onGoBack={() => {}}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <SectionTitle title="Delivering Address" />
        <Layouts.VSpace value={12} />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.primaryBlack,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexShrink: 1,
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.REGULAR_16,
                color: COLORS.primaryWhite,
              }}
            >
              111 Chu Thien, Hiep Tan Ward, Tan Phu District, Ho Chi Minh City
            </Text>
          </View>
          <Layouts.HSpace value={24} />
          <TouchableOpacity>
            <Text
              style={{ ...FONT_STYLES.REGULAR_16, color: COLORS.primaryWhite }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>
        <ListCartItem
          listItem={cartStore.listCartItem}
          type="short"
          allowSwipe={false}
        />
        <Layouts.Divider />
        <Layouts.VSpace value={16} />
        <SectionTitle title="Payment Method" />
        <Layouts.VSpace value={12} />
        <RadioButton.Group
          onValueChange={(value) => {
            cartStore.setPaymentSelected({
              paymentType: value,
              paymentInfo: {},
            });
          }}
          value={cartStore.paymentSelected.paymentType}
        >
          {LIST_PAYMENT_METHOD.map((item) => {
            return (
              <View
                key={item.value}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -8,
                }}
              >
                <RadioButton.Android value={item.value} />
                <Text
                  style={{
                    ...FONT_STYLES.SEMIBOLD_16,
                  }}
                >
                  {item.label}
                </Text>
                {item.value === 'credit_card' && (
                  <>
                    <Layouts.MaxSpace />
                    {isShowListCreditCart ? (
                      <Icons.ChevronUpIcon
                        onPress={() => toggleListCreditCart()}
                      />
                    ) : (
                      <Icons.ChevronDownIcon
                        onPress={() => toggleListCreditCart()}
                      />
                    )}
                  </>
                )}
                <Layouts.VSpace value={12} />
              </View>
            );
          })}
        </RadioButton.Group>
        <Collapsible collapsed={!isShowListCreditCart}>
          <ListCreditCard
            listCreditCard={listCreditCard}
            onValueChange={(value) => {
              cartStore.setPaymentSelected({
                paymentType: PAYMENT_TYPE.creditCard,
                paymentInfo: {},
              });

              cartStore.setCreditCardSelected(value);
            }}
            selectedValue={cartStore.creditCardSelected?.cardNumber}
          />
        </Collapsible>
        <Layouts.VSpace value={12} />
        {cartStore.cartCount !== 0 && (
          <View>
            <Layouts.Divider />
            <Layouts.VSpace value={12} />
            <SectionTitle title="Summary" />
            <CartInfoRow title="Subtotal" value={cartStore.subTotal} />
            <CartInfoRow title="Shipping" value={cartStore.shipping} />
            <CartInfoRow title="Discount" value={-cartStore.discount} />
            <Layouts.VSpace value={12} />
            <Layouts.Divider />
            <CartInfoRow title="Total" value={cartStore.total} isTotal />
          </View>
        )}
        <Layouts.VSpace value={24} />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          onPress={() => {
            navigation.goBack();
          }}
          label="Apply"
          buttonType="primary"
        />
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
});

const observable = observer(PaymentScreen);
export { observable as PaymentScreen };
