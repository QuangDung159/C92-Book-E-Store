import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { Buttons } from '@components';
import { DataModels } from '@models';
import { CartItem } from './cart-item';

interface ListCartItemProps {
  listItem: Array<DataModels.ICartItem>;
}

const ListCartItem: React.FC<ListCartItemProps> = ({ listItem }) => {
  return (
    <View
      style={{
        marginBottom: 12,
        marginTop: 24,
      }}
    >
      <FlashList
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={186}
        renderItem={({ item }) => {
          return <CartItem bookCartItem={item} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>{`Let's shop now`}</Text>
              <Buttons.CButton label={`Let's shop now`} onPress={() => {}} />
            </View>
          );
        }}
      />
    </View>
  );
};

export { ListCartItem };
