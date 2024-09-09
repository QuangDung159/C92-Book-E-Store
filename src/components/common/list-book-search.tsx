import { ContentStyle, FlashList } from '@shopify/flash-list';
import { toJS } from 'mobx';
import React from 'react';
import { RefreshControl } from 'react-native';
import { SEARCH_VIEW_STYLE } from '@constants';
import { DataModels } from '@models';
import { BookCardItem } from './book-card-item';
import { BookCardItemComplex } from './book-card-item-complex';
import { BookCardItemVertical } from './book-card-item-vertical';
import { EndOfListListComponent } from './end-of-list-component';

interface ListBookSearchProps {
  listItem: Array<DataModels.IBook>;
  onEndReached?: () => void;
  estimatedItemSize?: number;
  scrollRef?: React.MutableRefObject<any>;
  viewStyle?: string;
  onUpdateCount?: (countNumber: number, bookItem: DataModels.IBook) => void;
  endOfListText?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
  contentContainerStyle?: ContentStyle;
}

const ListBookSearch: React.FC<ListBookSearchProps> = ({
  listItem,
  onEndReached,
  estimatedItemSize,
  scrollRef,
  viewStyle,
  onUpdateCount,
  endOfListText,
  onRefresh,
  refreshing,
  contentContainerStyle,
}) => {
  const renderItem = ({ item, index }) => {
    if (viewStyle === SEARCH_VIEW_STYLE.list) {
      return (
        <BookCardItemVertical
          bookCardItem={{ ...item, count: 1 }}
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
      contentContainerStyle={contentContainerStyle}
      scrollEnabled
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      data={toJS(listItem)}
      keyExtractor={(item) => item.id}
      estimatedItemSize={estimatedItemSize}
      renderItem={renderItem}
      ListFooterComponent={<EndOfListListComponent content={endOfListText} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      numColumns={viewStyle === SEARCH_VIEW_STYLE.grid ? 2 : 1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export { ListBookSearch };
