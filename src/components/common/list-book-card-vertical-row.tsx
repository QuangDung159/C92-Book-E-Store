import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BookCardItem } from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalRowProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardVerticalRow: React.FC<ListBookCardVerticalRowProps> = ({
  listItem,
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48 - 24) / 2;

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={186}
      numColumns={2}
      renderItem={({ item }) => (
        <BookCardItem
          containerStyle={{
            width: cardWidth,
          }}
          bookCardItem={item}
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

export { ListBookCardVerticalRow };
