import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronDownProps {
  size?: number;
  color?: string;
}

const ChevronDown: React.FC<ChevronDownProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-down" size={size} color={color} />;
};

export { ChevronDown };
