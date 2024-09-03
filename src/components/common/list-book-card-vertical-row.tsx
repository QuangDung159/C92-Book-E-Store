import { FlashList } from '@shopify/flash-list';
import React from 'react';
import {
  BookCardItem,
  EmptyListComponent,
  EndOfListListComponent,
} from '@components';
import { DataModels } from '@models';

interface ListBookCardVerticalRowProps {
  listItem: Array<DataModels.IBook>;
  onEndReached?: () => void;
  estimatedItemSize?: number;
  scrollRef?: React.MutableRefObject<any>;
}

const ListBookCardVerticalRow: React.FC<ListBookCardVerticalRowProps> = ({
  listItem,
  onEndReached,
  estimatedItemSize,
  scrollRef,
}) => {
  return (
    <>
      <FlashList
        scrollEnabled
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={estimatedItemSize}
        numColumns={2}
        renderItem={({ item, index }) => (
          <BookCardItem bookCardItem={item} index={index} />
        )}
        ListEmptyComponent={() => {
          return <EmptyListComponent />;
        }}
        ListFooterComponent={<EndOfListListComponent />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export { ListBookCardVerticalRow };
