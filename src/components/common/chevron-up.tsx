import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronUpProps {
  size: number;
  color: string;
}

const ChevronUp: React.FC<ChevronUpProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-up" size={size} color={color} />;
};

export { ChevronUp };
