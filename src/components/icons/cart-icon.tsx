import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '@themes';

interface CartIconProps {
  size?: number;
  color?: string;
  onPress?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({
  size = 24,
  color = COLORS.primaryBlack,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <AntDesign name="shoppingcart" size={size} color={color} />
    </TouchableOpacity>
  );
};

export { CartIcon };
