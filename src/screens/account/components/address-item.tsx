import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface AddressItemProps {
  addressItem: DataModels.IShippingAddress;
}

const AddressItem: React.FC<AddressItemProps> = ({ addressItem }) => {
  const navigation = useNavigation();
  const { openAddEditAddressScreen } = useNavigate(navigation);

  return (
    <TouchableOpacity
      onPress={() => {
        openAddEditAddressScreen(addressItem);
      }}
    >
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {addressItem.name}
          </Text>
        </View>
        <Layouts.HSpace value={12} />
        <Text style={styles.textStyle}>{addressItem.phoneNumber}</Text>
      </View>
      <Layouts.VSpace value={4} />
      <Text style={styles.textStyle}>{addressItem.address}</Text>
      <Layouts.VSpace value={4} />
      <Text style={styles.textStyle}>
        {StringHelpers.getShortAddress(addressItem)}
      </Text>
      <Layouts.VSpace value={8} />
      {addressItem.primary && (
        <View style={styles.defaultTag}>
          <Text style={styles.textStyle}>Default</Text>
        </View>
      )}
      <Layouts.VSpace value={24} />
      <Layouts.Divider />
      <Layouts.VSpace value={24} />
    </TouchableOpacity>
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
  textStyle: {
    ...FONT_STYLES.REGULAR_14,
    lineHeight: 18,
  },
});

export { AddressItem };
