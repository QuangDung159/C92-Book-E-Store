import React, { FC } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS, FONT_STYLES } from '@themes';

interface CTextAreaProps {
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
  onFocus?: () => void;
  autoFocus?: boolean;
  label?: string;
  messageError?: string;
  labelStyle?: StyleProp<TextStyle>;
}

const CTextArea: FC<CTextAreaProps> = ({
  style,
  outlineStyle,
  disabled,
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType = 'default',
  value,
  onFocus,
  autoFocus,
  label,
  messageError,
  labelStyle,
}) => {
  return (
    <>
      {label && (
        <Text
          style={[
            {
              ...FONT_STYLES.BOLD_16,
              marginBottom: 4,
            },
            messageError && {
              color: COLORS.error50,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        style={[styles.searchInput, style]}
        mode="outlined"
        activeOutlineColor={messageError ? COLORS.error50 : COLORS.primaryBlack}
        outlineStyle={[
          styles.outlineStyle,
          messageError && {
            borderColor: COLORS.error50,
          },
          outlineStyle,
        ]}
        disabled={disabled}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        keyboardType={keyboardType}
        value={value}
        onFocus={onFocus}
        autoFocus={autoFocus}
      />
      {messageError && (
        <Text
          style={[
            {
              ...FONT_STYLES.SEMIBOLD_14,
              marginTop: 4,
            },
            messageError && {
              color: COLORS.error50,
            },
          ]}
        >
          {messageError}
        </Text>
      )}
    </>
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

export { CTextArea };
