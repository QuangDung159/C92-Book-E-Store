import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Layouts } from '@components';
import { COLORS } from '@themes';

interface SearchBarProps {
  showCartIcon?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ showCartIcon }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Happy reading!"
        style={styles.searchInput}
        mode="outlined"
        activeOutlineColor={COLORS.primaryBlack}
      />
      <Layouts.HSpace value={8} />
      <View style={styles.iconWrapper}>
        <Feather name="search" size={24} />
        {showCartIcon && (
          <>
            <Layouts.HSpace value={8} />
            <View>
              <AntDesign name="shoppingcart" size={24} />
              <View style={styles.cartIconContainer}>
                <Text style={styles.cartNumber}>99+</Text>
              </View>
            </View>
          </>
        )}
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
  searchInput: {
    height: 40,
    flex: 1,
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
