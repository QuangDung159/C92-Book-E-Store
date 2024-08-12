import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface MinusIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const MinusIcon: React.FC<MinusIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Entypo name="minus" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { MinusIcon };
