import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Inputs, Layouts } from '@components';
import { COLORS } from '@themes';
import { CartIconWithBadge } from './cart-icon-with-badge';

interface SearchBarProps {
  showCartIcon?: boolean;
  showBackIcon?: boolean;
  navigation?: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCartIcon,
  showBackIcon,
}) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {showBackIcon && (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Entypo name="chevron-left" size={24} />
        </TouchableOpacity>
      )}
      <Layouts.HSpace value={8} />
      <Inputs.CTextInput placeholder="Happy reading!" />
      <Layouts.HSpace value={8} />
      <View style={styles.iconWrapper}>
        <Feather name="search" size={24} />
        {showCartIcon && <CartIconWithBadge />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIconContainer: {
    position: 'absolute',
    bottom: 15,
    left: 10,
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 99,
    minHeight: 16,
    minWidth: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartNumber: {
    color: COLORS.primaryWhite,
    fontSize: 8,
    paddingHorizontal: 2,
    fontWeight: 'bold',
  },
});

export { SearchBar };
