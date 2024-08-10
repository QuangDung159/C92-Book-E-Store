import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface ChevronRightProps {
  size?: number;
  color?: string;
}

const ChevronRight: React.FC<ChevronRightProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="chevron-right" size={size} color={color} />;
};

export { ChevronRight };
