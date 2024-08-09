import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { BookCardItemComplex } from '@components';
import { DataModels } from '@models';

interface ListBookCardComplexProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardComplex: React.FC<ListBookCardComplexProps> = ({
  listItem,
}) => {
  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={186}
      renderItem={({ item }) => {
        return <BookCardItemComplex bookCardItem={item} />;
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

export { ListBookCardComplex };
