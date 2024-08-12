import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronUpIconProps {
  size: number;
  color: string;
}

const ChevronUpIcon: React.FC<ChevronUpIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-up" size={size} color={color} />;
};

export { ChevronUpIcon };
