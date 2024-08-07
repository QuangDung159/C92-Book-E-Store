import React, { FC } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '@themes';

interface CButtonProps {
  buttonType?: 'primary' | 'secondary';
  label?: string;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const CButton: FC<CButtonProps> = ({
  buttonType,
  label,
  disabled,
  labelStyle,
  style,
  onPress,
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
        {
          backgroundColor: getColor().backgroundColor,
          borderRadius: 6,
        },
        style,
      ]}
      mode="outlined"
      labelStyle={[
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: getColor().color,
        },
        labelStyle,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {label}
    </Button>
  );
};

CButton.defaultProps = {
  buttonType: 'primary',
  label: 'Press',
  disabled: false,
  labelStyle: {},
  style: {},
  onPress: () => {},
};

export { CButton };
