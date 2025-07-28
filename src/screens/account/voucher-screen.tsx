/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { EmptyListComponent, Layouts, ScreenHeader } from '@components';
import { SCREEN_NAME } from '@constants';
import { authenticationStore, cartStore, userStore } from '@store';
import { COLORS } from '@themes';
import { VoucherItem } from './components/voucher-item';

const VoucherScreen = ({ navigation, route }: any) => {
  const { from } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = async () => {
    await authenticationStore.fetchUser();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onLoadData();
    setRefreshing(false);
  };

  const listVoucher = useMemo(
    () => userStore.userProfile.listVoucher,
    [userStore.userProfile],
  );

  const isFromCheckout = from === SCREEN_NAME.CHECKOUT_SCREEN;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Vouchers" navigation={navigation} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Layouts.VSpace value={24} />
        {listVoucher?.length ? (
          <>
            {listVoucher.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <VoucherItem
                    voucher={item}
                    onPress={() => {
                      if (isFromCheckout) {
                        navigation.goBack();
                        cartStore.setVoucherSelected(item);
                      }
                    }}
                    isActive={
                      isFromCheckout ? cartStore.subTotal >= item.min : true
                    }
                    isSelected={
                      isFromCheckout
                        ? cartStore.voucherSelected?.id === item.id
                        : false
                    }
                  />
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <EmptyListComponent />
        )}
        <Layouts.VSpace value={24} />
      </ScrollView>
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
});

const observable = observer(VoucherScreen);
export { observable as VoucherScreen };
