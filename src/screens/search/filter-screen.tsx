import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { DEFAULT_PRICE_RANGE, PRICE_STEP } from '@constants';
import { DataModels } from '@models';
import { referenceOptionsStore, searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { delay, StringHelpers } from '@utils';
import { CollapsibleList, PriceMultiSlider } from './components';

const FilterScreen = ({ route, navigation }: any) => {
  const priceRange = route.params?.priceRange || DEFAULT_PRICE_RANGE;
  const [isShowAuthorList, setIsShowAuthorList] = useState(false);
  const [isShowFormList, setIsShowFormList] = useState(false);
  const [isShowPublisherList, setIsShowPublisherList] = useState(false);
  const [listAuthor, setListAuthor] = useState<DataModels.IReferenceOptions[]>(
    [],
  );
  const [listForm, setListForm] = useState<DataModels.IReferenceOptions[]>([]);
  const [listPublisher, setListPublisher] = useState<
    DataModels.IReferenceOptions[]
  >([]);

  useEffect(() => {
    searchStore.setSearchFilterPreviuos(searchStore.searchFilter);

    setListAuthor(referenceOptionsStore.authorDataSource);
    setListForm(referenceOptionsStore.formDataSource);
    setListPublisher(referenceOptionsStore.publisherDataSource);
  }, []);

  useEffect(() => {
    if (searchStore.listAuthorSelected.length > 0) {
      delay(500).then(() => {
        setIsShowAuthorList(true);
      });
    }

    if (searchStore.listFormSelected.length > 0) {
      delay(500).then(() => {
        setIsShowFormList(true);
      });
    }

    if (searchStore.listPublisherSelected.length > 0) {
      delay(500).then(() => {
        setIsShowPublisherList(true);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Filter"
        navigation={navigation}
        rightConponent={() => (
          <TouchableOpacity onPress={() => searchStore.resetSeachFilter()}>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        )}
        onGoBack={() => searchStore.backToPreviousFilter()}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <Layouts.VSpace value={24} />
        <Text style={styles.label}>Price</Text>
        <Layouts.VSpace value={12} />
        <View style={styles.priceInputWrapper}>
          <View style={styles.minInputWrapper}>
            <Inputs.CTextInput
              keyboardType="numeric"
              onEndEditing={(e) => {
                let priceMin = +e.nativeEvent.text;

                if (priceMin < priceRange[0]) {
                  priceMin = priceRange[0];
                }

                if (priceMin >= searchStore.searchFilter.max) {
                  priceMin = searchStore.searchFilter.max - PRICE_STEP * 100;
                }

                searchStore.setSearchFilter({
                  min: priceMin,
                });
              }}
              value={searchStore.searchFilter.min.toString()}
              onChangeText={(value) => {
                searchStore.setSearchFilter({
                  min: +value,
                });
              }}
              style={styles.minInput}
            />
            <Text style={styles.currency}> đ</Text>
          </View>
          <Layouts.MaxSpace />
          <View style={styles.maxInputWrapper}>
            <Inputs.CTextInput
              keyboardType="numeric"
              onEndEditing={(e) => {
                let priceMax = +e.nativeEvent.text;

                if (priceMax > priceRange[1]) {
                  priceMax = priceRange[1];
                }

                if (priceMax <= searchStore.searchFilter.min) {
                  priceMax = searchStore.searchFilter.min + PRICE_STEP * 100;
                }

                searchStore.setSearchFilter({
                  max: priceMax,
                });
              }}
              style={styles.maxInput}
              value={searchStore.searchFilter.max.toString()}
              onChangeText={(value) => {
                searchStore.setSearchFilter({
                  max: +value,
                });
              }}
            />
            <Text style={styles.currency}> đ</Text>
          </View>
        </View>
        <Layouts.VSpace value={8} />
        <PriceMultiSlider
          selctedRange={searchStore.filterSelectedRange}
          maximumValue={priceRange[1]}
          minimumValue={priceRange[0]}
          onSlidingComplete={(value) => {
            searchStore.setSearchFilter({
              min: value[0],
              max: value[1],
            });
          }}
        />
        <Layouts.VSpace value={24} />
        <CollapsibleList
          isCollapse={!isShowAuthorList}
          dataSource={
            listAuthor.length > 0
              ? listAuthor
              : referenceOptionsStore.authorDataSource
          }
          listItemReferForSearch={searchStore.listAuthorSelected}
          onChangeText={(value) => {
            const result = StringHelpers.searchByFirstLetter(
              referenceOptionsStore.authorDataSource,
              value,
            );

            setListAuthor(result);
          }}
          onCheck={(list) => {
            searchStore.setSearchFilter({
              author: list,
            });
          }}
          listChecked={searchStore.listAuthorSelected}
          title="Author"
          setIsCollapse={setIsShowAuthorList}
        />
        <Layouts.VSpace value={12} />
        <CollapsibleList
          isCollapse={!isShowFormList}
          dataSource={
            listForm.length > 0
              ? listForm
              : referenceOptionsStore.formDataSource
          }
          listItemReferForSearch={searchStore.listFormSelected}
          onChangeText={(value) => {
            const result = StringHelpers.searchByFirstLetter(
              referenceOptionsStore.formDataSource,
              value,
            );

            setListForm(result);
          }}
          onCheck={(list) => {
            searchStore.setSearchFilter({
              form: list,
            });
          }}
          listChecked={searchStore.listFormSelected}
          title="Form"
          setIsCollapse={setIsShowFormList}
        />
        <Layouts.VSpace value={12} />
        <CollapsibleList
          isCollapse={!isShowPublisherList}
          dataSource={
            listPublisher.length > 0
              ? listPublisher
              : referenceOptionsStore.publisherDataSource
          }
          listItemReferForSearch={searchStore.listPublisherSelected}
          onChangeText={(value) => {
            const result = StringHelpers.searchByFirstLetter(
              referenceOptionsStore.publisherDataSource,
              value,
            );

            setListPublisher(result);
          }}
          onCheck={(list) => {
            searchStore.setSearchFilter({
              publisher: list,
            });
          }}
          listChecked={searchStore.listPublisherSelected}
          title="Publisher"
          setIsCollapse={setIsShowPublisherList}
        />
        <Layouts.VSpace value={24} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          onPress={() => {
            navigation.goBack();
            searchStore.submitSearch();
          }}
          label="Apply"
          buttonType="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  reset: {
    ...FONT_STYLES.REGULAR_16,
  },
  label: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  priceInputWrapper: {
    flexDirection: 'row',
  },
  minInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minInput: {
    height: 40,
    width: 100,
    alignContent: 'center',
  },
  currency: {
    ...FONT_STYLES.REGULAR_16,
  },
  maxInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maxInput: {
    height: 40,
    width: 100,
    alignContent: 'center',
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
  wrapper: {
    paddingHorizontal: 24,
  },
});

const observable = observer(FilterScreen);
export { observable as FilterScreen };
