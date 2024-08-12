import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface ChipProps {
  onRemove: () => void;
  label: string;
  showRemove?: boolean;
  value: string;
  isLastItem?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  onRemove,
  label,
  showRemove,
  value,
  isLastItem,
}) => {
  return (
    <View
      key={value}
      style={[
        styles.container,
        !isLastItem && {
          marginRight: 8,
        },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      {showRemove && (
        <>
          <Layouts.HSpace value={4} />
          <TouchableOpacity onPress={onRemove}>
            <MaterialCommunityIcons name="close-circle" size={20} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
});

export { Chip };
