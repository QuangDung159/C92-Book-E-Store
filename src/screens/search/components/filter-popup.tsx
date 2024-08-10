import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { Layouts, Sliders } from '@components';
import { DataModels } from '@models';
import { FilterViewModel } from '../view-models';

interface FilterPopupProps {
  searchFilter: DataModels.ISearchFilter;
  onClose: (searchFiltrer: DataModels.ISearchFilter) => void;
  visible: boolean;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  searchFilter,
  onClose,
  visible,
}) => {
  const filterVM = useRef<FilterViewModel>(
    new FilterViewModel(searchFilter),
  ).current;

  useEffect(() => {
    filterVM.setVisible(visible);
  }, [filterVM, visible]);

  return (
    <Layouts.BottomPopup visible={filterVM.visible}>
      <Text style={styles.popupText}>This is a bottom popup!</Text>
      <Button
        title="Close"
        onPress={() => {
          onClose(searchFilter);
          filterVM.setVisible(false);
        }}
      />
      <Text>{filterVM.priceSelectedRange[0]}</Text>
      <Text>{filterVM.priceSelectedRange[1]}</Text>
      <Sliders.MultiSlider
        selctedRange={filterVM.priceSelectedRange}
        maximumValue={679000}
        minimumValue={79000}
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
