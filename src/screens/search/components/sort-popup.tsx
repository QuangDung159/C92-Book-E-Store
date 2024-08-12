import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon, Layouts } from '@components';
import { LIST_SORT_OPTION } from '@constants';
import { FONT_STYLES } from '@themes';

interface SortPopupProps {
  visible: boolean;
  onDismiss: () => void;
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
          <Text style={styles.popupText}>Sort</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
          }}
        >
          <Text style={styles.reset}></Text>
        </View>
      </View>
      <Layouts.VSpace value={24} />
      {LIST_SORT_OPTION.map((item) => {
        return (
          <View key={item.value}>
            <Text
              style={{
                ...FONT_STYLES.SEMIBOLD_16,
              }}
            >
              {item.label}
            </Text>
            <Layouts.VSpace value={12} />
          </View>
        );
      })}
      <Layouts.VSpace value={12} />
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
