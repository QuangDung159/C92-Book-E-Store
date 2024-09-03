import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { BookCardItemComplex, EmptyListComponent } from '@components';
import { DataModels } from '@models';

interface ListBookCardComplexProps {
  listItem: Array<DataModels.IBook>;
  onEndReached?: () => void;
  estimatedItemSize?: number;
  scrollRef?: React.MutableRefObject<any>;
}

const ListBookCardComplex: React.FC<ListBookCardComplexProps> = ({
  listItem,
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
        return <BookCardItemComplex bookCardItem={item} />;
      }}
      ListEmptyComponent={() => {
        return <EmptyListComponent />;
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export { ListBookCardComplex };
