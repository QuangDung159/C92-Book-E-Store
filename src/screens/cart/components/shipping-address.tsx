import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface ShippingAddressProps {
  address?: string;
  onPressChange?: () => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  address,
  onPressChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressChange?.()}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {address || 'Add your shipping address'}
          </Text>
        </View>
      </TouchableOpacity>
      <Layouts.HSpace value={24} />
      {address && (
        <TouchableOpacity onPress={() => onPressChange?.()}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlack,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addressContainer: {
    flexShrink: 1,
  },
  address: {
    ...FONT_STYLES.REGULAR_16,
    color: COLORS.primaryWhite,
  },
  changeText: { ...FONT_STYLES.REGULAR_16, color: COLORS.primaryWhite },
});

export { ShippingAddress };
