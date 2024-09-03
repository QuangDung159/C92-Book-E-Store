import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { DataModels } from '@models';
import { BookCardItemHorizontal } from './book-card-item-horizontal';
import { EmptyListComponent } from './empty-list-component';

interface ListBookCardHorizontalProps {
  listItem: Array<DataModels.IBook>;
}

const ListBookCardHorizontal: React.FC<ListBookCardHorizontalProps> = ({
  listItem,
}) => {
  return (
    <FlashList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={listItem}
      keyExtractor={(item) => item.id}
      estimatedItemSize={186}
      renderItem={({ item, index }) => (
        <BookCardItemHorizontal
          bookCardItem={item}
          isLastItem={index === listItem.length}
        />
      )}
      ListEmptyComponent={() => {
        return <EmptyListComponent />;
      }}
    />
  );
};

export { ListBookCardHorizontal };
