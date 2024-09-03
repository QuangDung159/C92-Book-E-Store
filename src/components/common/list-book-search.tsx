import { FlashList } from '@shopify/flash-list';
import { toJS } from 'mobx';
import React from 'react';
import { SEARCH_VIEW_STYLE } from '@constants';
import { DataModels } from '@models';
import { BookCardItem } from './book-card-item';
import { BookCardItemComplex } from './book-card-item-complex';
import { BookCardItemVertical } from './book-card-item-vertical';
import { EmptyListComponent } from './empty-list-component';
import { EndOfListListComponent } from './end-of-list-component';

interface ListBookSearchProps {
  listItem: Array<DataModels.IBook>;
  onEndReached?: () => void;
  estimatedItemSize?: number;
  scrollRef?: React.MutableRefObject<any>;
  viewStyle?: string;
  onUpdateCount?: (countNumber: number, bookItem: DataModels.IBook) => void;
}

const ListBookSearch: React.FC<ListBookSearchProps> = ({
  listItem,
  onEndReached,
  estimatedItemSize,
  scrollRef,
  viewStyle,
  onUpdateCount,
}) => {
  const renderItem = ({ item, index }) => {
    if (viewStyle === SEARCH_VIEW_STYLE.list) {
      return (
        <BookCardItemVertical
          bookCardItem={item}
          onUpdateCount={(count) => {
            onUpdateCount(count, item);
          }}
        />
      );
    } else if (viewStyle === SEARCH_VIEW_STYLE.grid) {
      return <BookCardItem bookCardItem={item} index={index} />;
    }
    return <BookCardItemComplex bookCardItem={item} />;
  };

  return (
    <FlashList
      scrollEnabled
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      data={toJS(listItem)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={estimatedItemSize}
      renderItem={renderItem}
      ListEmptyComponent={() => {
        return <EmptyListComponent />;
      }}
      ListFooterComponent={<EndOfListListComponent />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      numColumns={viewStyle === SEARCH_VIEW_STYLE.grid ? 2 : 1}
    />
  );
};

export { ListBookSearch };
