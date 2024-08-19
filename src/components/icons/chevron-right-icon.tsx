import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface ChevronRightIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Entypo name="chevron-right" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { ChevronRightIcon };
