import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon, Layouts } from '@components';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';

interface SortPopupProps {
  searchFilter: DataModels.ISearchFilter;
  onClose: (searchFiltrer: DataModels.ISearchFilter) => void;
  visible: boolean;
  onDismiss: () => void;
  priceRange: number[];
}

const SortPopup: React.FC<SortPopupProps> = ({ visible, onDismiss }) => {
  return (
    <Layouts.BottomPopup visible={visible}>
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
            <CloseIcon />
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

const observable = observer(SortPopup);
export { observable as SortPopup };
