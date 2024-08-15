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
  onFocus?: () => void;
  autoFocus?: boolean;
  label?: string;
  messageError?: string;
  labelStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
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
  onFocus,
  autoFocus,
  label,
  messageError,
  labelStyle,
  multiline,
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
        clearButtonMode="always"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholder={placeholder}
        style={[
          styles.searchInput,
          multiline && {
            height: 120,
          },
          style,
        ]}
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
        contentStyle={{
          fontSize: 14,
        }}
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

export { CTextInput };
