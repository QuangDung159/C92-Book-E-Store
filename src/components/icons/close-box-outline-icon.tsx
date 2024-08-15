import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface CloseBoxOutlineIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
  disabledColor?: string;
}

const CloseBoxOutlineIcon: React.FC<CloseBoxOutlineIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
  disabled,
  disabledColor = COLORS.gray,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled || !onPress ? 1 : 0.6}
      onPress={() => {
        if (!disabled) {
          onPress?.();
        }
      }}
    >
      <MaterialCommunityIcons
        name="close-box-outline"
        size={size}
        color={disabled ? disabledColor : color}
      />
    </TouchableOpacity>
  );
};

export { CloseBoxOutlineIcon };
