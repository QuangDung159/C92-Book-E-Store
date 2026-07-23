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
  scrollRef,
}) => {
  return (
    <>
      <FlashList
        scrollEnabled
        ref={scrollRef as any}
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.id}
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
