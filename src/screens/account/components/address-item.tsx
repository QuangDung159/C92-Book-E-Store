import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface AddressItemProps {
  addressItem: DataModels.IShippingAddress;
}

const AddressItem: React.FC<AddressItemProps> = ({ addressItem }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {addressItem.name}
          </Text>
        </View>
        <Layouts.HSpace value={12} />
        <Text>{addressItem.phoneNumber}</Text>
      </View>
      <Layouts.VSpace value={4} />
      <Text>{addressItem.address}</Text>
      <Layouts.VSpace value={4} />
      <Text>{StringHelpers.getShortAddress(addressItem)}</Text>
      <Layouts.VSpace value={8} />
      <View style={styles.defaultTag}>
        <Text>Default</Text>
      </View>
      <Layouts.VSpace value={24} />
      <Layouts.Divider />
      <Layouts.VSpace value={24} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  nameWrapper: {
    width: 180,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray70,
  },
  name: {
    ...FONT_STYLES.BOLD_14,
    marginRight: 8,
  },
  defaultTag: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error50,
    padding: 8,
    width: 80,
    alignItems: 'center',
  },
});

export { AddressItem };
