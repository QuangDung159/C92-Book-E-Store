import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface PlusIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Entypo name="plus" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { PlusIcon };
