import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface PlusIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
  disabledColor?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
  disabled,
  disabledColor = COLORS.gray,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.6}
      onPress={() => {
        if (!disabled) {
          onPress?.();
        }
      }}
    >
      <Entypo
        name="plus"
        size={size}
        color={disabled ? disabledColor : color}
      />
    </TouchableOpacity>
  );
};

export { PlusIcon };
