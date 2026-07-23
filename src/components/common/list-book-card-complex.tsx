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
  scrollRef,
}) => {
  return (
    <FlashList
      ref={scrollRef as any}
      showsVerticalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
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
