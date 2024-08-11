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
import { FilterViewModel } from './view-models';

const FilterScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef<ScrollView>();
  const filterVM = useRef<FilterViewModel>(
    new FilterViewModel(searchStore.searchFilter),
  ).current;

  const priceRange = route.params?.priceRange || [0, 100000];

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Filter"
        navigation={navigation}
        rightConponent={() => (
          <TouchableOpacity>
            <Text style={styles.reset}>Reset</Text>
          </TouchableOpacity>
        )}
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
              style={styles.minInput}
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
              value={filterVM.priceSelectedRange[0].toString()}
              onChangeText={(value) => {
                let priceMin = +value;

                if (priceMin < priceRange[0]) {
                  priceMin = priceRange[0];
                }

                if (priceMin >= filterVM.priceSelectedRange[1]) {
                  priceMin = filterVM.priceSelectedRange[1] - PRICE_STEP;
                }

                filterVM.setPriceSelectedPrice([
                  priceMin,
                  filterVM.priceSelectedRange[1],
                ]);
              }}
            />
            <Text style={styles.currency}> đ</Text>
          </View>
          <Layouts.MaxSpace />
          <View style={styles.maxInputWrapper}>
            <TextInput
              style={styles.maxInput}
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
              value={filterVM.priceSelectedRange[1].toString()}
              onChangeText={(value) => {
                let priceMax = +value;

                if (priceMax > priceRange[1]) {
                  priceMax = priceRange[1];
                }

                if (priceMax <= filterVM.priceSelectedRange[0]) {
                  priceMax = filterVM.priceSelectedRange[0] + PRICE_STEP;
                }

                filterVM.setPriceSelectedPrice([
                  filterVM.priceSelectedRange[0],
                  priceMax,
                ]);
              }}
            />
            <Text style={styles.currency}> đ</Text>
          </View>
        </View>
        <Layouts.VSpace value={8} />
        <PriceMultiSlider
          selctedRange={filterVM.priceSelectedRange}
          maximumValue={priceRange[1]}
          minimumValue={priceRange[0]}
          onSlidingComplete={(value) => {
            filterVM.setPriceSelectedPrice(value);
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
