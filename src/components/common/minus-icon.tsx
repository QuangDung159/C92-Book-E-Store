import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '@themes';

interface MinusIconProps {
  size?: number;
  color?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
}) => {
  return <Entypo name="minus" size={size} color={color} />;
};

export { MinusIcon };
