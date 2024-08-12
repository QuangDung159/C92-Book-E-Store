import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface ChevronDownIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Entypo name="chevron-down" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { ChevronDownIcon };
