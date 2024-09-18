import React, { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputEndEditingEventData,
  TextInputIOSProps,
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
  optional?: boolean;
  clearButtonMode?: TextInputIOSProps['clearButtonMode'];
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
  optional,
  clearButtonMode = 'while-editing',
}) => {
  const showValidationError = shouldShowErrorTitle && errorMessage;
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  return (
    <>
      {label && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={[
              styles.label,
              showValidationError && {
                color: COLORS.error50,
              },
              labelStyle,
            ]}
          >
            {label}
          </Text>
          {optional && (
            <Text style={[styles.label, styles.optional]}>Optional</Text>
          )}
        </View>
      )}
      <View>
        <TextInput
          textContentType="oneTimeCode"
          clearButtonMode={clearButtonMode}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          placeholder={placeholder}
          style={[
            styles.searchInput,
            disabled && {
              opacity: 0.6,
            },
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
          onChangeText={(value) => {
            onChangeText?.(value);
            setShowEyeIcon(Boolean(value));
          }}
          onEndEditing={onEndEditing}
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          value={value}
          onFocus={onFocus}
          autoFocus={autoFocus}
          autoCapitalize="none"
          contentStyle={[
            styles.contentStyle,
            showValidationError && styles.errorStyle,
          ]}
        />
        {secureTextEntry && showEyeIcon && (
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
            {hidePassword ? (
              <Icons.EyeIcon
                size={16}
                onPress={() => {
                  setHidePassword(!hidePassword);
                }}
                color={COLORS.gray60}
              />
            ) : (
              <Icons.EyeOffIcon
                size={16}
                onPress={() => {
                  setHidePassword(!hidePassword);
                }}
                color={COLORS.gray60}
              />
            )}
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
    ...FONT_STYLES.SEMIBOLD_14,
    marginBottom: 4,
  },
  optional: {
    ...FONT_STYLES.SEMIBOLD_12,
    color: COLORS.gray70,
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
