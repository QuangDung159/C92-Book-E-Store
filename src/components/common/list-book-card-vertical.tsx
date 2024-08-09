import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { BookCardItemVertical } from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardVertical: React.FC<ListBookCardVerticalProps> = ({
  listItem,
}) => {
  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={186}
      renderItem={({ item }) => {
        return <BookCardItemVertical bookCardItem={item} />;
      }}
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

export { ListBookCardVertical };
