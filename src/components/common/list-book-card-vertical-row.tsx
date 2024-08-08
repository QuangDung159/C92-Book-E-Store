import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { BookCardRowItem } from '@components';
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
      renderItem={({ item, index }) => (
        <BookCardRowItem
          containerStyle={{
            width: cardWidth,
          }}
          bookCardRowItemLeft={listItem[0]}
          bookCardRowItemRight={listItem[1]}
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
