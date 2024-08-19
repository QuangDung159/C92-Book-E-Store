import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layouts, ListBookCardHorizontal } from '@components';
import { TOP_BOOKS_FILTER } from '@constants';
import { DataModels } from '@models';
import { TopBooksFilter } from './top-books-filter';

interface HorizontalListCardProps {
  title: string;
  listItem: Array<DataModels.IBook>;
  showSeeMore?: boolean;
  showTopFilter?: boolean;
  topBooksSelectedFilter?: string;
  setTopBooksSelectedFilter?: (value: string) => void;
}

const HorizontalListCard: React.FC<HorizontalListCardProps> = ({
  title,
  listItem,
  showSeeMore,
  showTopFilter,
  topBooksSelectedFilter,
  setTopBooksSelectedFilter,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={styles.categoryTitle}>{title}</Text>
        <Layouts.MaxSpace />
        {showSeeMore && <Text style={styles.seeMore}>See more</Text>}
      </View>
      <Layouts.VSpace value={12} />
      {showTopFilter && (
        <>
          <TopBooksFilter
            listFilter={TOP_BOOKS_FILTER}
            onPress={(selectedValue) => {
              setTopBooksSelectedFilter(selectedValue.value);
            }}
            selectedValue={topBooksSelectedFilter}
          />
          <Layouts.VSpace value={24} />
        </>
      )}
      <ListBookCardHorizontal listItem={listItem} />
    </>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'semibold',
  },
  seeMore: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export { HorizontalListCard };
