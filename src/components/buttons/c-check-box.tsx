import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { COLORS, FONT_STYLES } from '@themes';

interface CCheckBoxProps {
  label: string;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onCheck: () => void;
  checked: 'checked' | 'unchecked' | 'indeterminate';
}

const CCheckBox: FC<CCheckBoxProps> = ({
  label,
  disabled,
  labelStyle,
  containerStyle,
  onCheck,
  checked,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Checkbox.Android
        status={checked}
        disabled={disabled}
        onPress={() => {
          onCheck?.();
        }}
        color={COLORS.primaryBlack}
      />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...FONT_STYLES.REGULAR_16,
    marginBottom: -2,
  },
});

export { CCheckBox };
