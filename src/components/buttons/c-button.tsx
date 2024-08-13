import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface CButtonProps {
  buttonType?: 'primary' | 'secondary';
  label?: string;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  iconLeft?: () => React.ReactNode;
  iconRight?: () => React.ReactNode;
}

const CButton: FC<CButtonProps> = ({
  buttonType,
  label,
  disabled,
  labelStyle,
  style,
  onPress,
  iconLeft,
  iconRight,
}) => {
  const getColor = () => {
    return {
      backgroundColor:
        buttonType === 'primary' ? COLORS.primaryBlack : COLORS.primaryWhite,
      color:
        buttonType === 'primary' ? COLORS.primaryWhite : COLORS.primaryBlack,
    };
  };

  return (
    <Button
      style={[
        styles.button,
        {
          backgroundColor: getColor().backgroundColor,
        },
        style,
      ]}
      mode="outlined"
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.container}>
        {iconLeft?.()}
        <Layouts.HSpace value={12} />
        <Text
          style={[
            styles.label,
            {
              color: getColor().color,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        <Layouts.HSpace value={12} />
        {iconRight?.()}
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  label: {
    ...FONT_STYLES.BOLD_14,
    marginTop: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
});

export { CButton };
