import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Close, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { PriceMultiSlider } from './price-multi-slider';
import { FilterViewModel } from '../view-models';

interface FilterPopupProps {
  searchFilter: DataModels.ISearchFilter;
  onClose: (searchFiltrer: DataModels.ISearchFilter) => void;
  visible: boolean;
  onDismiss: () => void;
  priceRange: number[];
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  searchFilter,
  onClose,
  visible,
  onDismiss,
  priceRange,
}) => {
  const filterVM = useRef<FilterViewModel>(
    new FilterViewModel(searchFilter),
  ).current;

  useEffect(() => {
    filterVM.setVisible(visible);
  }, [filterVM, visible]);

  return (
    <Layouts.BottomPopup visible={filterVM.visible}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={onDismiss}>
            <Close />
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
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  popupText: {
    ...FONT_STYLES.SEMIBOLD_18,
  },
  reset: {
    ...FONT_STYLES.REGULAR_18,
  },
});

const observable = observer(FilterPopup);
export { observable as FilterPopup };
