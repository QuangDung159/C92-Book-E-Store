/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AppState,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Divider, RadioButton } from 'react-native-paper';
import {
  BottomCheckoutSection,
  Icons,
  Layouts,
  ScreenHeader,
  SectionTitle,
} from '@components';
import {
  DEEP_LINK_PAYMENT_SUCCESS_URL,
  LIST_PAYMENT_METHOD,
  PAYMENT_TYPE,
} from '@constants';
import { useNavigate } from '@hooks';
import { cartStore, sharedStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { delay, StringHelpers } from '@utils';
import { CartInfoRow, ListCreditCard, ShippingAddress } from './components';
import { ListCartItem } from './components/list-cart-item';

const CheckoutScreen = ({ navigation }: any) => {
  const { openAddressScreen } = useNavigate(navigation);
  const [isShowListCreditCart, setIsShowListCreditCart] = useState(false);
  const [fetchZaloPayOrderDone, setFetchZaloPayOrderDone] = useState(false);

  const appState = useRef(AppState.currentState);

  const toggleListCreditCart = () =>
    setIsShowListCreditCart(!isShowListCreditCart);

  const listCreditCard = useMemo(
    () => userStore.userProfile?.listCreditCard || [],
    [],
  );

  useEffect(() => {
    setIsShowListCreditCart(
      cartStore.paymentSelected.paymentType === PAYMENT_TYPE.creditCard,
    );
  }, [cartStore.paymentSelected.paymentType]);

  const onFetchPaymentInfo = useCallback(async (appTransId: string) => {
    const response = await cartStore.onFetchZaloPaymentInfo(appTransId);

    if (response.status === 200 && response.data) {
      if (response.data.returncode === 1) {
        setFetchZaloPayOrderDone(true);
        delay(1000).then(() => {
          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${cartStore.currentOrder.id}&message=Payment success with Zalo Pay!`,
          );

          sharedStore.setShowLoading(false);
          cartStore.clearAllCurrentPaymentInfo();
        });
      }
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !fetchZaloPayOrderDone
      ) {
        if (cartStore.zaloAppTransId) {
          onFetchPaymentInfo(cartStore.zaloAppTransId);
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [cartStore?.zaloAppTransId, fetchZaloPayOrderDone, onFetchPaymentInfo]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Checkout" navigation={navigation} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <SectionTitle title="Shipping Address" />
        <Layouts.VSpace value={12} />
        <ShippingAddress
          address={
            cartStore.shippingAddressData
              ? StringHelpers.getFullAddress(cartStore.shippingAddressData)
              : ''
          }
          onPressChange={() => openAddressScreen()}
        />
        <ListCartItem
          listItem={cartStore.listCartItem}
          type="short"
          allowSwipe={false}
        />
        <Divider />
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
                    ...FONT_STYLES.REGULAR_16,
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
            <Divider />
            <Layouts.VSpace value={12} />
            <SectionTitle title="Summary" />
            <CartInfoRow title="Subtotal" value={cartStore.subTotal} />
            <CartInfoRow title="Shipping" value={cartStore.shipping} />
            <CartInfoRow title="Discount" value={-cartStore.discount} />
            <Layouts.VSpace value={12} />
            <Divider />
            <CartInfoRow title="Total" value={cartStore.total} isTotal />
          </View>
        )}
        <Layouts.VSpace value={24} />
      </ScrollView>
      <BottomCheckoutSection
        onPress={async () => {
          sharedStore.setShowLoading(true);

          await cartStore.createOrder();

          if (cartStore.paymentSelected.paymentType === PAYMENT_TYPE.momo) {
            cartStore.handleMoMoPayment(async (result) => {
              if (await Linking.canOpenURL(result.data.payUrl)) {
                Linking.openURL(result.data.payUrl);
              }
            });

            sharedStore.setShowLoading(false);
            cartStore.clearAllCurrentPaymentInfo();
            return;
          }

          if (cartStore.paymentSelected.paymentType === PAYMENT_TYPE.zalo_pay) {
            await cartStore.handleZaloPayPayment();
            return;
          }

          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${cartStore.currentOrder.id}&message=Payment success!`,
          );

          sharedStore.setShowLoading(false);
          cartStore.clearAllCurrentPaymentInfo();
        }}
        priceDisplay={cartStore.total}
        disabled={cartStore.cartCount === 0}
        buttonTitle="Submit"
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
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
});

const observable = observer(CheckoutScreen);
export { observable as CheckoutScreen };
