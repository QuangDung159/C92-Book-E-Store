import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronLeftIconProps {
  size?: number;
  color?: string;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-left" size={size} color={color} />;
};

export { ChevronLeftIcon };
