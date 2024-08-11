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
      <View
        style={{
          marginLeft: -8,
        }}
      >
        <Checkbox.Android
          status={checked}
          disabled={disabled}
          onPress={() => {
            onCheck?.();
          }}
          color={COLORS.primaryBlack}
        />
      </View>
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
    ...FONT_STYLES.SEMIBOLD_16,
  },
});

export { CCheckBox };
