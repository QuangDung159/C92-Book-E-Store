import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface CloseIconProps {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Ionicons name="close" size={size} color={color} />;
};

export { CloseIcon };
