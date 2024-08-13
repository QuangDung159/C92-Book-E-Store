import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { DataModels } from '@models';
import { CartItem } from './cart-item';

interface ListCartItemProps {
  listItem: Array<DataModels.IBook>;
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
              <Text>No data</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export { ListCartItem };
