import React, { FC } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputEndEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '@themes';

interface CTextInputProps {
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
  onChangeText?: (value: string) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
}

const CTextInput: FC<CTextInputProps> = ({
  style,
  outlineStyle,
  disabled,
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType = 'default',
  value,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.searchInput, style]}
      mode="outlined"
      activeOutlineColor={COLORS.primaryBlack}
      outlineStyle={[styles.outlineStyle, outlineStyle]}
      disabled={disabled}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      keyboardType={keyboardType}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
  },
  outlineStyle: {
    borderRadius: 8,
  },
});

export { CTextInput };
