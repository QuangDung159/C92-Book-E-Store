import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface SearchIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Feather name="search" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { SearchIcon };
