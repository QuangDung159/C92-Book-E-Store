/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Layouts, ScreenHeader } from '@components';
import { authenticationStore, userStore } from '@store';
import { COLORS } from '@themes';
import { VoucherItem } from './components/voucher-item';

const VoucherScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);

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
        {listVoucher.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <VoucherItem voucher={item} />
            </React.Fragment>
          );
        })}
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
