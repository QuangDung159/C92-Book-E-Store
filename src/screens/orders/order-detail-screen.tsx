/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Divider } from 'react-native-paper';
import {
  CancelOrderButton,
  Layouts,
  LoadingText,
  ScreenHeader,
} from '@components';
import { DataModels } from '@models';
import { OrderServices } from '@services';
import { notificationStore, searchStore, sharedStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { HorizontalListCard } from 'screens/home/components';
import { ListOrder } from './components';

const OrderDetailScreen = ({ navigation, route }: any) => {
  const orderId = route.params?.orderId;
  const [order, setOrder] = useState<DataModels.IOrder>(route.params?.order);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    sharedStore.setShowLoading(true);
    await onFetchOrderDetail();
    sharedStore.setShowLoading(false);
  };

  const onFetchOrderDetail = async () => {
    const result = await OrderServices.fetchOrderById(order?.id || orderId);
    if (result?.success && result.data?.order) {
      setOrder(result.data.order);
    } else {
      setLoadingText('Not found');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onFetchOrderDetail();
    setRefreshing(false);
  };

  const renderOrderInfoItem = (title: string, value: string) => {
    return (
      <>
        <Text
          style={{
            ...FONT_STYLES.BOLD_14,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...FONT_STYLES.REGULAR_14,
          }}
        >
          {value}
        </Text>
      </>
    );
  };

  const paymentTypeText = useMemo(() => {
    if (order?.cart.paymentType === 'credit_card') {
      return 'Credit Card - ' + order.cart.paymentInfo.cardNumber;
    }

    return order?.cart.paymentType.toUpperCase();
  }, [order]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Order Detail" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {order ? (
          <Collapsible collapsed={!order} duration={2000}>
            <ListOrder listOrder={[order]} isShowFullListCart />
            <View style={styles.wrapper}>
              {renderOrderInfoItem('Status:', order.status?.toUpperCase())}
              <Layouts.VSpace value={12} />
              {renderOrderInfoItem(
                'Shipping address:',
                order.cart.shippingInfo,
              )}
              <Text
                style={{
                  ...FONT_STYLES.REGULAR_14,
                  marginTop: 4,
                }}
              >{`${order.cart.shippingAddress}`}</Text>
              <Layouts.VSpace value={12} />
              {renderOrderInfoItem('Payment method:', paymentTypeText)}
              {order.status === 'created' && (
                <CancelOrderButton
                  order={order}
                  onSuccess={async () => {
                    notificationStore.loadNotification();
                    sharedStore.setShowLoading(true);
                    await onFetchOrderDetail();
                    sharedStore.setShowLoading(false);
                  }}
                />
              )}
            </View>
          </Collapsible>
        ) : (
          <LoadingText text={loadingText} />
        )}

        <Divider />
        <View style={styles.wrapper}>
          <Layouts.VSpace value={12} />
          <HorizontalListCard
            listItem={searchStore.listTopBook}
            title="Maybe you will like"
          />
          <Layouts.VSpace value={24} />
          <HorizontalListCard
            listItem={searchStore.listLatest}
            title="Viewed"
            showSeeMore={true}
          />
        </View>
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
    paddingBottom: 24,
  },
});

const observable = observer(OrderDetailScreen);
export { observable as OrderDetailScreen };
