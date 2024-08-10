import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface CloseProps {
  size?: number;
  color?: string;
}

const Close: React.FC<CloseProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Ionicons name="close" size={size} color={color} />;
};

export { Close };
