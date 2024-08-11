import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { DataModels } from '@models';
import { BookCardItemHorizontal } from './book-card-item-horizontal';

interface ListBookCardHorizontalProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardHorizontal: React.FC<ListBookCardHorizontalProps> = ({
  listItem,
}) => {
  return (
    <FlashList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={186}
      renderItem={({ item, index }) => (
        <BookCardItemHorizontal
          bookCardItem={item}
          isLastItem={index === listItem.length}
        />
      )}
      ListEmptyComponent={() => {
        return (
          <View>
            <Text>No data</Text>
          </View>
        );
      }}
    />
  );
};

export { ListBookCardHorizontal };