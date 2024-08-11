import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Buttons, Inputs, Layouts, ScreenHeader } from '@components';
import { PRICE_STEP } from '@constants';
import { searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { PriceMultiSlider } from './components';

const FilterScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef<ScrollView>();

  const priceRange = route.params?.priceRange || [1000, 100000];

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
        onGoBack={() => searchStore.resetSeachFilter()}
      />
      <ScrollView
        ref={scrollRef}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
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
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Layouts.VSpace value={12} />
        <Buttons.CButton
          onPress={() => {
            navigation.goBack();
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
  },
});

const observable = observer(FilterScreen);
export { observable as FilterScreen };
