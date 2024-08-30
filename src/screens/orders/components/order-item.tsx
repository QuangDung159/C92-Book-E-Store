import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { DataModels } from '@models';
import { CartItem } from 'screens/cart';

interface OrderItemProps {
  orderItem: DataModels.IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  const bookCartItem = orderItem.cart.listCartItem[0];
  return (
    <React.Fragment key={orderItem.id}>
      <View
        style={{
          alignSelf: 'center',
          marginTop: 24,
        }}
      >
        <CartItem bookCartItem={bookCartItem} type="short" />
      </View>
    </React.Fragment>
  );
};

const observable = observer(OrderItem);
export { observable as OrderItem };
