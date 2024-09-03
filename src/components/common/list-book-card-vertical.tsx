import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';
import { BookCardItemVertical, EmptyListComponent } from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalProps {
  listItem: Array<DataModels.IBook>;
  onUpdateCount?: (countNumber: number, bookItem: DataModels.IBook) => void;
}

const ListBookCardVertical: React.FC<ListBookCardVerticalProps> = ({
  listItem,
  onUpdateCount,
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
        renderItem={({ item }) => {
          return (
            <BookCardItemVertical
              bookCardItem={item}
              onUpdateCount={(count) => {
                onUpdateCount(count, item);
              }}
            />
          );
        }}
        ListEmptyComponent={() => {
          return <EmptyListComponent />;
        }}
      />
    </View>
  );
};

export { ListBookCardVertical };
