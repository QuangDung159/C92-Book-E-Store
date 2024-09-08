import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface ShippingAddressProps {
  onPressChange?: () => void;
  shippingAddress?: DataModels.IShippingAddress;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({
  onPressChange,
  shippingAddress,
}) => {
  const address = useMemo(() => {
    if (shippingAddress) {
      return userStore.getFullAddress(shippingAddress);
    }
    return 'Add your shipping address';
  }, [shippingAddress]);

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={() => onPressChange?.()}>
          <Text style={styles.address}>
            {shippingAddress.name} - {shippingAddress.phoneNumber}
          </Text>
          <Text style={styles.address}>{address}</Text>
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
    ...FONT_STYLES.REGULAR_14,
    color: COLORS.primaryWhite,
    lineHeight: 18,
  },
  changeText: { ...FONT_STYLES.SEMIBOLD_14, color: COLORS.primaryWhite },
});

export { ShippingAddress };
