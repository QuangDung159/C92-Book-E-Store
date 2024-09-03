import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { BookCardItemVertical, EmptyListComponent } from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalProps {
  listItem: Array<DataModels.IBook>;
  onUpdateCount?: (countNumber: number, bookItem: DataModels.IBook) => void;
  onEndReached?: () => void;
  estimatedItemSize?: number;
  scrollRef?: React.MutableRefObject<any>;
}

const ListBookCardVertical: React.FC<ListBookCardVerticalProps> = ({
  listItem,
  onUpdateCount,
  onEndReached,
  estimatedItemSize,
  scrollRef,
}) => {
  return (
    <FlashList
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={estimatedItemSize}
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
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export { ListBookCardVertical };
