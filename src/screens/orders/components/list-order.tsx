import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyListComponent, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { OrderItem } from './order-item';

interface ListOrderProps {
  listOrder: DataModels.IOrder[];
  isShowFullListCart?: boolean;
}

const ListOrder: React.FC<ListOrderProps> = ({
  listOrder,
  isShowFullListCart,
}) => {
  return (
    <View style={styles.container}>
      <FlashList
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={listOrder}
        renderItem={({ item }) => {
          return (
            <OrderItem
              orderItem={item}
              isShowFullListCart={isShowFullListCart}
            />
          );
        }}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        ListEmptyComponent={() => {
          return (
            <>
              <Layouts.VSpace value={40} />
              <EmptyListComponent />
            </>
          );
        }}
        estimatedItemSize={60}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  title: {
    ...FONT_STYLES.SEMIBOLD_14,
    marginBottom: 4,
  },
});

const observable = observer(ListOrder);
export { observable as ListOrder };
