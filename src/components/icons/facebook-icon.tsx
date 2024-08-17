import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface FacebookIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
  disabledColor?: string;
}

const FacebookIcon: React.FC<FacebookIconProps> = ({
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
      <AntDesign
        name="facebook-square"
        size={size}
        color={disabled ? disabledColor : color}
      />
    </TouchableOpacity>
  );
};

export { FacebookIcon };
