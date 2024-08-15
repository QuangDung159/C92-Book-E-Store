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
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={() => onPressChange?.()}>
          <Text style={styles.address}>
            {address || 'Add your shipping address'}
          </Text>
        </TouchableOpacity>
      </View>
      <Layouts.HSpace value={24} />
      <Layouts.MaxSpace />
      {address && (
        <TouchableOpacity onPress={() => onPressChange?.()}>
          <View
            style={{
              width: 60,
            }}
          >
            <Text style={styles.changeText}>Change</Text>
          </View>
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
