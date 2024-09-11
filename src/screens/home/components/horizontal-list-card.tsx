import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts, ListBookCardHorizontal } from '@components';
import { TOP_BOOKS_FILTER } from '@constants';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';
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
  const navigation = useNavigation();

  const { openBookListingScreen } = useNavigate(navigation);

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
        {showSeeMore && (
          <TouchableOpacity
            onPress={() => {
              openBookListingScreen(listItem, title);
            }}
          >
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        )}
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
    ...FONT_STYLES.SEMIBOLD_20,
    lineHeight: 32,
  },
  seeMore: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export { HorizontalListCard };
