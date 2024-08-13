import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Chip,
  Layouts,
  ListBookCardComplex,
  ListBookCardVertical,
  ListBookCardVerticalRow,
  SearchBar,
} from '@components';
import {
  CATEGORY,
  DEFAULT_PRICE_RANGE,
  LIST_SORT_OPTION,
  SEARCH_VIEW_STYLE,
  TOP_BOOKS,
} from '@constants';
import { useNavigate } from '@hooks';
import { referenceOptionsStore, searchStore } from '@store';
import { COLORS } from '@themes';
import { StringHelpers } from '@utils';
import { ListChipByListFilter, SortPopup, SortSection } from './components';

const SearchScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef<ScrollView>();
  const { openFilterScreen } = useNavigate(navigation);

  const [isShowSortPopup, setIsShowSortPopup] = useState(false);

  useEffect(() => {
    const searchFilter = route.params?.searchFilter;
    if (searchFilter) {
      searchStore.setSearchFilter({
        ...searchStore.searchFilter,
        ...searchFilter,
      });
    }
  }, [route.params]);

  const renderFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => {
            openFilterScreen(DEFAULT_PRICE_RANGE);
          }}
        >
          <MaterialCommunityIcons name="filter" size={24} />
        </TouchableOpacity>
        <Layouts.HSpace value={8} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {searchStore.searchFilter.category && (
            <Chip
              label={
                CATEGORY.find(
                  (item) => item.id === searchStore.searchFilter.category,
                )?.name
              }
              onRemove={() => {
                searchStore.setSearchFilter({
                  category: null,
                });
              }}
              value={searchStore.searchFilter.category}
              showRemove
            />
          )}
          <Chip
            label={`${StringHelpers.formatCurrency(searchStore.searchFilter.min)} - ${StringHelpers.formatCurrency(searchStore.searchFilter.max)}`}
            onRemove={() => {
              searchStore.setSearchFilter({
                min: DEFAULT_PRICE_RANGE[0],
                max: DEFAULT_PRICE_RANGE[1],
              });
            }}
            value={`${searchStore.searchFilter.min} - ${searchStore.searchFilter.max}`}
            showRemove
            disabled={
              searchStore.searchFilter.min === DEFAULT_PRICE_RANGE[0] &&
              searchStore.searchFilter.max === DEFAULT_PRICE_RANGE[1]
            }
          />
          <ListChipByListFilter
            dataSource={referenceOptionsStore.authorDataSource}
            listItemId={searchStore.listAuthorSelected}
            onRemove={(itemId) => {
              const listSelected = searchStore.listAuthorSelected.filter(
                (item) => item !== itemId,
              );

              searchStore.setSearchFilter({
                author: listSelected,
              });
            }}
          />
          <ListChipByListFilter
            dataSource={referenceOptionsStore.formDataSource}
            listItemId={searchStore.listFormSelected}
            onRemove={(itemId) => {
              const listSelected = searchStore.listFormSelected.filter(
                (item) => item !== itemId,
              );

              searchStore.setSearchFilter({
                form: listSelected,
              });
            }}
          />
          <ListChipByListFilter
            dataSource={referenceOptionsStore.publisherDataSource}
            listItemId={searchStore.listPublisherSelected}
            isHaveLastItem
            onRemove={(itemId) => {
              const listSelected = searchStore.listPublisherSelected.filter(
                (item) => item !== itemId,
              );

              searchStore.setSearchFilter({
                publisher: listSelected,
              });
            }}
          />
        </ScrollView>
      </View>
    );
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <SortPopup
        initSortValue={searchStore.sortOption.value}
        visible={isShowSortPopup}
        onDismiss={(sortSelected) => {
          setIsShowSortPopup(false);
          const sortOptionSelected = LIST_SORT_OPTION.find(
            (item) => item.value === sortSelected,
          );

          if (sortOptionSelected) {
            searchStore.setSortOption(sortOptionSelected);
          }
        }}
      />
      <SearchBar
        showCartIcon
        showBackIcon
        navigation={navigation}
        autoFocus={route?.params?.autoFocus}
        showSearch
      />
      <ScrollView
        ref={scrollRef}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <SortSection
          onPress={() => {
            setIsShowSortPopup(true);
          }}
          label={searchStore.sortOption.label}
        />
        <Layouts.VSpace value={12} />
        {renderFilter()}
        <Layouts.VSpace value={12} />
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.grid && (
          <ListBookCardVerticalRow listItem={TOP_BOOKS} />
        )}
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.list && (
          <ListBookCardVertical listItem={TOP_BOOKS} />
        )}
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.complex && (
          <ListBookCardComplex listItem={TOP_BOOKS} />
        )}
      </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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

const observable = observer(SearchScreen);
export { observable as SearchScreen };
