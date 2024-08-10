import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Close, Layouts, Sliders } from '@components';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';
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
      <Sliders.MultiSlider
        selctedRange={filterVM.priceSelectedRange}
        maximumValue={priceRange[1]}
        minimumValue={priceRange[0]}
        onSlidingComplete={filterVM.setPriceSelectedPrice}
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
