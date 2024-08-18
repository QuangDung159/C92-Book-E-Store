import React, { FC } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Icons } from '@components';
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
  errorMessage?: string;
  labelStyle?: StyleProp<TextStyle>;
  multiline?: boolean;
  shouldShowErrorTitle?: boolean;
  secureTextEntry?: boolean;
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
  errorMessage,
  labelStyle,
  multiline,
  shouldShowErrorTitle,
  secureTextEntry,
}) => {
  const showValidationError = shouldShowErrorTitle && errorMessage;

  return (
    <>
      {label && (
        <Text
          style={[
            styles.label,
            errorMessage && {
              color: COLORS.error50,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View>
        <TextInput
          textContentType="oneTimeCode"
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
          activeOutlineColor={
            showValidationError ? COLORS.error50 : COLORS.primaryBlack
          }
          outlineStyle={[styles.outlineStyle, outlineStyle]}
          disabled={disabled}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onFocus={onFocus}
          autoFocus={autoFocus}
          contentStyle={[
            styles.contentStyle,
            showValidationError && styles.errorStyle,
          ]}
        />
        {secureTextEntry && (
          <View
            style={{
              position: 'absolute',
              right: 4,
              width: 20,
              height: 20,
              backgroundColor: COLORS.gray200,
              top: 12,
            }}
          >
            <Icons.EyeIcon size={16} />
          </View>
        )}
      </View>
      {showValidationError && (
        <Text
          style={[
            styles.errorTextStyle,
            errorMessage && {
              color: COLORS.error50,
            },
          ]}
        >
          {errorMessage}
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
  errorStyle: {
    borderColor: COLORS.error50,
    borderWidth: 1,
  },
  label: {
    ...FONT_STYLES.BOLD_16,
    marginBottom: 4,
  },
  contentStyle: {
    ...FONT_STYLES.REGULAR_14,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
  errorTextStyle: {
    ...FONT_STYLES.SEMIBOLD_12,
    marginTop: 4,
  },
});

export { CTextInput };
