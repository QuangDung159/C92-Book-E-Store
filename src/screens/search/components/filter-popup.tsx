import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Close, Layouts, Sliders } from '@components';
import { DataModels } from '@models';
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
      <TouchableOpacity onPress={onDismiss}>
        <Close />
      </TouchableOpacity>
      <Text style={styles.popupText}>Filter</Text>
      <Button
        title="Close"
        onPress={() => {
          onClose(searchFilter);
          onDismiss();
        }}
      />
      <Text>{filterVM.priceSelectedRange[0]}</Text>
      <Text>{filterVM.priceSelectedRange[1]}</Text>
      <Sliders.MultiSlider
        selctedRange={filterVM.priceSelectedRange}
        maximumValue={priceRange[0]}
        minimumValue={priceRange[1]}
        onSlidingComplete={filterVM.setPriceSelectedPrice}
      />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const observable = observer(FilterPopup);
export { observable as FilterPopup };
