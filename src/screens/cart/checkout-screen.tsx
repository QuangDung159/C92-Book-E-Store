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
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Divider, RadioButton } from 'react-native-paper';
import {
  BottomCheckoutSection,
  Layouts,
  ScreenHeader,
  SectionTitle,
} from '@components';
import {
  DEEP_LINK_PAYMENT_SUCCESS_URL,
  LIST_PAYMENT_METHOD,
  LIST_PAYMENT_METHOD_IOS,
  PAYMENT_TYPE,
  SCREEN_NAME,
} from '@constants';
import { useNavigate } from '@hooks';
import { CartServices } from '@services';
import { cartStore, notificationStore, sharedStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { PaymentType } from '@types';
import { delay, ToastHelpers } from '@utils';
import { CartInfoRow, CreditCardItem, ShippingAddress } from './components';
import { ListCartItem } from './components/list-cart-item';

const CheckoutScreen = ({ navigation }: any) => {
  const {
    openAddressScreen,
    openVoucherScreen,
    openHomeScreen,
    openPaymentCardScreen,
  } = useNavigate(navigation);
  const [isShowListCreditCart, setIsShowListCreditCart] = useState(false);
  const [fetchZaloPayOrderDone, setFetchZaloPayOrderDone] = useState(false);

  const appState = useRef(AppState.currentState);

  const primaryCreditCard = useMemo(
    () => userStore.userProfile?.listCreditCard.find((item) => item.primary),
    [userStore.userProfile?.listCreditCard],
  );

  const listPaymentMethods = useMemo(() => {
    return Platform.OS === 'ios'
      ? LIST_PAYMENT_METHOD_IOS
      : LIST_PAYMENT_METHOD;
  }, []);

  useEffect(() => {
    cartStore.setVoucherSelected(null);
  }, []);

  useEffect(() => {
    setIsShowListCreditCart(
      cartStore.paymentSelected.paymentType === PAYMENT_TYPE.creditCard,
    );
  }, [cartStore.paymentSelected.paymentType]);

  const fetchZaloPaymentInfo = useCallback(async (appTransId: string) => {
    sharedStore.setShowLoading(true);
    const response = await cartStore.onFetchZaloPaymentInfo(appTransId);

    if (response.status === 200 && response.data) {
      const returnCode = response.data.returncode;
      setFetchZaloPayOrderDone(true);

      if (returnCode === 1) {
        delay(1000).then(() => {
          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${cartStore.currentOrder.id}&message=Payment success with Zalo Pay!`,
          );
          sharedStore.setShowLoading(false);
        });
      }

      if (returnCode === -49) {
        const result = await CartServices.updateCart({
          paymentType: 'cod',
          id: cartStore.cart.id,
        });

        if (result?.success) {
          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${cartStore.currentOrder.id}&message=Create success`,
          );
        }

        sharedStore.setShowLoading(false);
      }
    } else {
      sharedStore.setShowLoading(false);
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
          fetchZaloPaymentInfo(cartStore.zaloAppTransId);
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [cartStore?.zaloAppTransId, fetchZaloPayOrderDone, fetchZaloPaymentInfo]);

  const onSubmitCheckout = async () => {
    sharedStore.setShowLoading(true);
    await cartStore.submitOrder(
      cartStore.paymentSelected.paymentType === 'cod'
        ? async () => {
            await Promise.all([
              cartStore.fetchCart(userStore.userProfile.id),
              userStore.fetchListOrder('created'),
              notificationStore.loadNotification(),
            ]);

            openHomeScreen();
            await delay(500);
            ToastHelpers.showToast({
              title: 'Order created successfully',
              type: 'success',
            });
          }
        : null,
    );
    sharedStore.setShowLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Checkout" navigation={navigation} />
      {cartStore.cart ? (
        <>
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.wrapper}
          >
            <Layouts.VSpace value={24} />
            <SectionTitle title="Shipping Address" />
            <Layouts.VSpace value={12} />
            <ShippingAddress
              onPressChange={() => openAddressScreen()}
              shippingAddress={cartStore.shippingAddressData}
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
                  paymentType: value as PaymentType,
                  id: value,
                });

                if (value === 'credit_card') {
                  cartStore.setCreditCardSelected(primaryCreditCard.id);
                } else {
                  cartStore.setCreditCardSelected(null);
                }
              }}
              value={cartStore.paymentSelected.paymentType}
            >
              {listPaymentMethods.map((item) => {
                return (
                  <View key={item.value} style={styles.paymentItem}>
                    <RadioButton.Android value={item.value} />
                    <Text style={styles.payemntLabel}>{item.label}</Text>
                    <Layouts.VSpace value={12} />
                  </View>
                );
              })}
            </RadioButton.Group>
            {Platform.OS !== 'ios' && (
              <Collapsible collapsed={!isShowListCreditCart}>
                <TouchableOpacity
                  style={styles.creditCard}
                  onPress={() => {
                    openPaymentCardScreen();
                  }}
                >
                  <CreditCardItem cardItem={primaryCreditCard} isLast />
                </TouchableOpacity>
              </Collapsible>
            )}
            <Layouts.VSpace value={12} />
            <Divider />
            <Layouts.VSpace value={12} />
            <View style={styles.voucherSection}>
              <Text style={styles.voucher}>Voucher:</Text>
              <TouchableOpacity
                onPress={() => {
                  openVoucherScreen(SCREEN_NAME.CHECKOUT_SCREEN);
                }}
              >
                <Text
                  style={[
                    styles.voucher,
                    !cartStore.voucherSelected && styles.voucherCode,
                  ]}
                >
                  {cartStore.voucherSelected?.code || 'Select voucher'}
                </Text>
              </TouchableOpacity>
            </View>
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
            onPress={() => {
              if (!cartStore.shippingAddressData) {
                ToastHelpers.showToast({
                  title: 'Please choose your shipping address',
                  type: 'error',
                });
              } else {
                onSubmitCheckout();
              }
            }}
            priceDisplay={cartStore.total}
            disabled={cartStore.cartCount === 0}
            buttonTitle="Submit"
          />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_12,
              color: COLORS.gray60,
            }}
          >
            Processing....
          </Text>
        </View>
      )}
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
  voucher: {
    ...FONT_STYLES.BOLD_16,
  },
  voucherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherCode: {
    ...FONT_STYLES.REGULAR_16,
    color: COLORS.gray70,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
  },
  payemntLabel: {
    ...FONT_STYLES.REGULAR_16,
  },
  creditCard: {
    paddingLeft: 24,
  },
});

const observable = observer(CheckoutScreen);
export { observable as CheckoutScreen };
