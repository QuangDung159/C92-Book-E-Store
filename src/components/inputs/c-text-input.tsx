import React, { FC } from 'react';
import {
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
  onEndEditting?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => void;
  placeholder?: string;
}

const CTextInput: FC<CTextInputProps> = ({
  style,
  outlineStyle,
  disabled,
  onChangeText,
  onEndEditting,
  placeholder,
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
      onEndEditing={onEndEditting}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    flex: 1,
  },
  outlineStyle: {
    borderRadius: 8,
  },
});

export { CTextInput };
