import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Layouts, ScreenHeader } from '@components';
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
      >
        <Layouts.VSpace value={24} />
        <Text style={styles.label}>Price</Text>
        <Layouts.VSpace value={12} />
        <View style={styles.priceInputWrapper}>
          <View style={styles.minInputWrapper}>
            <TextInput
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
              style={styles.minInput}
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
              value={searchStore.searchFilter.min.toString()}
              onChangeText={(value) => {
                searchStore.setSearchFilter({
                  min: +value,
                });
              }}
            />
            <Text style={styles.currency}> đ</Text>
          </View>
          <Layouts.MaxSpace />
          <View style={styles.maxInputWrapper}>
            <TextInput
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
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
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
});

const observable = observer(FilterScreen);
export { observable as FilterScreen };
