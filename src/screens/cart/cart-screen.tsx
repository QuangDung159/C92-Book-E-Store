import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts, ScreenHeader } from '@components';
import { searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { ListCartItem } from './components/list-cart-item';

const CartScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Cart" navigation={navigation} onGoBack={() => {}} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <ListCartItem listItem={searchStore.listBook} />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.BOLD_22,
            }}
          >
            {StringHelpers.formatCurrency(250000000)}
          </Text>
          <Buttons.CButton
            onPress={() => {
              navigation.goBack();
            }}
            label="Checkout"
            buttonType="primary"
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
});

const observable = observer(CartScreen);
export { observable as CartScreen };
