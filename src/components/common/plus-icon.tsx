import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface PlusIconProps {
  size?: number;
  color?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="plus" size={size} color={color} />;
};

export { PlusIcon };
