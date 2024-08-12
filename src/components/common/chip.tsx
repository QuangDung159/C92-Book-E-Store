import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface ChipProps {
  onRemove: (type: string) => void;
  label: string;
  showRemove?: boolean;
  value: string;
  isLastItem?: boolean;
  disabled?: boolean;
  type: string;
}

const Chip: React.FC<ChipProps> = ({
  onRemove,
  label,
  showRemove,
  value,
  isLastItem,
  disabled,
  type,
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
          <Icons.CloseCircleIcon
            size={20}
            onPress={() => {
              onRemove?.(type);
            }}
            disabled={disabled}
          />
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
