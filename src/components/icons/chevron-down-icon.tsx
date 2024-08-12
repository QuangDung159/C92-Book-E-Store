import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronDownIconProps {
  size?: number;
  color?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-down" size={size} color={color} />;
};

export { ChevronDownIcon };
