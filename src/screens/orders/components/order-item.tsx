import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface OrderItemProps {
  orderItem: DataModels.IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{orderItem.id}</Text>
      </View>
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

const observable = observer(OrderItem);
export { observable as OrderItem };
