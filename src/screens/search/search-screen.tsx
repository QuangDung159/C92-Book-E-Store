import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Chip,
  EmptyListComponent,
  Layouts,
  ListBookSearch,
  SearchBar,
} from '@components';
import {
  CATEGORY,
  DEFAULT_PRICE_RANGE,
  LIST_SORT_OPTION,
  SCREEN_NAME,
} from '@constants';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { referenceOptionsStore, searchStore, userStore } from '@store';
import { COLORS } from '@themes';
import { StringHelpers } from '@utils';
import { ListChipByListFilter, SortPopup, SortSection } from './components';

const SearchScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef(null);
  const { openFilterScreen } = useNavigate(navigation);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { height } = Dimensions.get('window');

  const [isShowSortPopup, setIsShowSortPopup] = useState(false);

  const screenName = route?.name;

  useEffect(() => {
    const searchFilter = route.params?.searchFilter;
    if (searchFilter) {
      searchStore.setSearchFilter({
        ...searchStore.searchFilter,
        ...searchFilter,
      });
    }
  }, [route.params]);

  useEffect(() => {
    loadData(page === 1, page);
  }, [page]);

  const loadData = async (showLoading: boolean, pageNumber: number) => {
    setLoading(true);
    await searchStore.submitSearch(showLoading, pageNumber);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await searchStore.submitSearch(false, 1);
    setRefreshing(false);
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onUpdateCount = (count: number, bookItem: DataModels.IBook) => {
    searchStore.updateBookItem({
      ...bookItem,
      count: bookItem.count + count,
    });
  };

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

                searchStore.submitSearch(true);
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

              searchStore.submitSearch(true);
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

              searchStore.submitSearch(true);
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

              searchStore.submitSearch(true);
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

              searchStore.submitSearch(true);
            }}
          />
        </ScrollView>
      </View>
    );
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <SortPopup
        initSortValue={searchStore.sortOption.value}
        visible={isShowSortPopup}
        onDoneDismiss={() => {
          searchStore.submitSearch(true);
        }}
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
        showCartIcon={userStore.authenticated}
        showBackIcon
        navigation={navigation}
        autoFocus={route?.params?.autoFocus}
        showSearch
        isPreventGoToSearchScreen={screenName === SCREEN_NAME.SEARCH}
        onPressSearch={() => {
          searchStore.submitSearch(true);
        }}
      />
      <SortSection
        onPress={() => {
          setIsShowSortPopup(true);
        }}
        label={searchStore.sortOption.label}
      />
      <Layouts.VSpace value={12} />
      {renderFilter()}
      <Layouts.VSpace value={12} />
      <View
        style={{
          height,
          paddingBottom: 216,
        }}
      >
        {searchStore.listBook.length > 0 ? (
          <ListBookSearch
            scrollRef={scrollRef}
            listItem={searchStore.listBook}
            onEndReached={handleEndReached}
            estimatedItemSize={height}
            viewStyle={searchStore.viewStyle}
            onUpdateCount={onUpdateCount}
            endOfListText={loading ? 'Loading...' : 'End of list'}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        ) : (
          <EmptyListComponent />
        )}
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
