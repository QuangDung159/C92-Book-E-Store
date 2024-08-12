import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronRightIconProps {
  size?: number;
  color?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-right" size={size} color={color} />;
};

export { ChevronRightIcon };
