import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Layouts } from '@components';
import { LIST_SORT_OPTION } from '@constants';
import { FONT_STYLES } from '@themes';
import { PopupHeader } from 'components/layouts';

interface SortPopupProps {
  visible: boolean;
  onDismiss: (value: string) => void;
  initSortValue: string;
  onDoneDismiss?: () => void;
}

const SortPopup: React.FC<SortPopupProps> = ({
  visible,
  onDismiss,
  initSortValue,
  onDoneDismiss,
}) => {
  const [sortSelected, setSortSelected] = useState(initSortValue);

  return (
    <Layouts.BottomPopup visible={visible} onDismiss={onDoneDismiss}>
      <PopupHeader
        label="Sort"
        onDismiss={() => {
          onDismiss(sortSelected);
        }}
      />
      <View style={styles.contentWrapper}>
        <RadioButton.Group
          onValueChange={(value) => setSortSelected(value)}
          value={sortSelected}
        >
          {LIST_SORT_OPTION.map((item) => {
            return (
              <View key={item.value} style={styles.sortItem}>
                <RadioButton.Android value={item.value} />
                <Text style={styles.sortLabel}>{item.label}</Text>
                <Layouts.VSpace value={12} />
              </View>
            );
          })}
        </RadioButton.Group>
      </View>
      <Layouts.VSpace value={12} />
    </Layouts.BottomPopup>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginLeft: -8,
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
});

const observable = observer(SortPopup);
export { observable as SortPopup };
