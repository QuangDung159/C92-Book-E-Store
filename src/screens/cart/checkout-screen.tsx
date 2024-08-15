import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { LIST_PAYMENT_METHOD } from '@constants';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { CartInfoRow, SectionTitle } from './components';
import { ListCartItem } from './components/list-cart-item';

const PaymentScreen = ({ navigation }: any) => {
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
        <Layouts.VSpace value={24} />
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
        <Layouts.VSpace value={36} />
        <SectionTitle title="Payment Method" />
        <Layouts.VSpace value={24} />
        <RadioButton.Group onValueChange={(value) => {}} value={'name_asc'}>
          {LIST_PAYMENT_METHOD.map((item) => {
            return (
              <View key={item.value} style={{}}>
                <RadioButton.Android value={item.value} />
                <Text style={{}}>{item.label}</Text>
                <Layouts.VSpace value={12} />
              </View>
            );
          })}
        </RadioButton.Group>
        <Layouts.VSpace value={36} />
        {cartStore.cartCount !== 0 && (
          <>
            <View>
              <SectionTitle title="Summary" />
              <CartInfoRow title="Subtotal" value={cartStore.subTotal} />
              <CartInfoRow title="Shipping" value={cartStore.shipping} />
              <CartInfoRow title="Discount" value={-cartStore.discount} />
              <Layouts.VSpace value={12} />
              <View style={styles.divider} />
              <CartInfoRow title="Total" value={cartStore.total} isTotal />
            </View>
            <Layouts.VSpace value={24} />
          </>
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
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
});

const observable = observer(PaymentScreen);
export { observable as PaymentScreen };
