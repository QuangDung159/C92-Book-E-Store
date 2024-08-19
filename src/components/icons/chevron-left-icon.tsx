import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface ChevronLeftIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        onPress?.();
      }}
    >
      <Entypo name="chevron-left" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { ChevronLeftIcon };
