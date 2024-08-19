import { Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layouts, ListBookCardVertical, ScreenHeader } from '@components';
import { DataModels } from '@models';
import { searchStore } from '@store';
import { COLORS } from '@themes';

const BookListingScreen = ({ navigation, route }: any) => {
  const scrollRef = useRef<ScrollView>();

  const listBook = route.params?.listBook || [];
  const title = route.params?.title;

  const onUpdateCount = (count: number, bookItem: DataModels.IBook) => {
    searchStore.updateBookItem({
      ...bookItem,
      count: bookItem.count + count,
    });
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title={title} navigation={navigation} />
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollRef}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <Layouts.VSpace value={24} />
          <ListBookCardVertical
            listItem={listBook}
            onUpdateCount={onUpdateCount}
          />
          <Layouts.VSpace value={50} />
        </ScrollView>
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

const observable = observer(BookListingScreen);
export { observable as BookListingScreen };
