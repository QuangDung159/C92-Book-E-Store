import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';
import { BookCardItem } from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalRowProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardVerticalRow: React.FC<ListBookCardVerticalRowProps> = ({
  listItem,
}) => {
  return (
    <View
      style={{
        marginBottom: 55,
      }}
    >
      <FlashList
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={186}
        numColumns={2}
        renderItem={({ item, index }) => (
          <BookCardItem bookCardItem={item} index={index} />
        )}
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

export { ListBookCardVerticalRow };
