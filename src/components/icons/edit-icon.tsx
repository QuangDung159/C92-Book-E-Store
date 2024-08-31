import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface EditIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Feather name="edit" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { EditIcon };
