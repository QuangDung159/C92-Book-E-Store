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
import { ChevronLeft, Layouts } from '@components';
import { searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { PriceMultiSlider } from './components';
import { FilterViewModel } from './view-models';

const FilterScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef<ScrollView>();
  const filterVM = useRef<FilterViewModel>(
    new FilterViewModel(searchStore.searchFilter),
  ).current;

  const onDismiss = () => {
    navigation.goBack();
  };

  const priceRange = route.params?.priceRange || [0, 100000];

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={onDismiss}>
              <ChevronLeft />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text style={styles.popupText}>Filter</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}
          >
            <Text style={styles.reset}>Reset</Text>
          </View>
        </View>
        <Layouts.VSpace value={24} />
        <Text
          style={{
            ...FONT_STYLES.SEMIBOLD_16,
          }}
        >
          Price
        </Text>
        <Layouts.VSpace value={12} />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextInput
              style={{
                height: 40,
                width: 100,
                alignContent: 'center',
              }}
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
              value={filterVM.priceSelectedRange[0].toString()}
              onChangeText={(value) => {
                let priceMin = +value;

                if (priceMin < priceRange[0]) {
                  priceMin = priceRange[0];
                }

                filterVM.setPriceSelectedPrice([
                  priceMin,
                  filterVM.priceSelectedRange[1],
                ]);
              }}
            />
            <Text
              style={{
                ...FONT_STYLES.REGULAR_16,
              }}
            >
              {' '}
              đ
            </Text>
          </View>
          <Layouts.MaxSpace />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <TextInput
              style={{
                height: 40,
                width: 95,
                alignContent: 'center',
              }}
              mode="outlined"
              activeOutlineColor={COLORS.primaryBlack}
              value={filterVM.priceSelectedRange[1].toString()}
              onChangeText={(value) => {
                let priceMax = +value;

                if (priceMax > priceRange[1]) {
                  priceMax = priceRange[1];
                }

                filterVM.setPriceSelectedPrice([
                  filterVM.priceSelectedRange[0],
                  priceMax,
                ]);
              }}
            />
            <Text
              style={{
                ...FONT_STYLES.REGULAR_16,
              }}
            >
              {' '}
              đ
            </Text>
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
  popupText: {
    ...FONT_STYLES.SEMIBOLD_18,
  },
  reset: {
    ...FONT_STYLES.REGULAR_18,
  },
});

const observable = observer(FilterScreen);
export { observable as FilterScreen };
