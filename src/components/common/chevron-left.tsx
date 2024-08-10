import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronLeftProps {
  size?: number;
  color?: string;
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-left" size={size} color={color} />;
};

export { ChevronLeft };
