import { Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { EmptyListComponent, ListBookSearch, ScreenHeader } from '@components';
import { DataModels } from '@models';
import { searchStore } from '@store';
import { COLORS } from '@themes';

interface BookListingProps {
  title: string;
  listBook: DataModels.IBook[];
  loadData?: () => void;
  navigation: any;
}

const BookListing: React.FC<BookListingProps> = ({
  navigation,
  title,
  listBook,
  loadData,
}: any) => {
  const scrollRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false);

  const { height } = Dimensions.get('window');

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData?.();
    setRefreshing(false);
  };

  const onUpdateCount = (count: number, bookItem: DataModels.IBook) => {
    searchStore.updateBookItem({
      ...bookItem,
      count: bookItem.count + count,
    });
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} navigation={navigation} />
      <View style={styles.wrapper}>
        <View
          style={{
            height,
            paddingBottom: Platform.select({
              android: 55,
              ios: 116,
            }),
          }}
        >
          {listBook.length > 0 ? (
            <>
              <ListBookSearch
                contentContainerStyle={{
                  paddingTop: 24,
                }}
                scrollRef={scrollRef}
                listItem={listBook}
                estimatedItemSize={height}
                viewStyle={'list'}
                onUpdateCount={onUpdateCount}
                endOfListText="End of list"
                onRefresh={onRefresh}
                refreshing={refreshing}
              />
            </>
          ) : (
            <EmptyListComponent />
          )}
        </View>
      </View>
      <View style={styles.scrollTop}>
        <TouchableOpacity onPress={scrollToTop}>
          <Entypo name="chevron-up" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
  scrollTop: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 24,
    opacity: 0.8,
  },
});

const observable = observer(BookListing);
export { observable as BookListing };
