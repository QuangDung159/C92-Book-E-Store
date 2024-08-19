import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface CartHeartIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const CartHeartIcon: React.FC<CartHeartIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <MaterialCommunityIcons name="cart-heart" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { CartHeartIcon };
