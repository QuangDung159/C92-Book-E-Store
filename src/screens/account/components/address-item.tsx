import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface AddressItemProps {
  addressItem: DataModels.IShippingAddress;
  onSubmitShippingAddress?: (
    shippingAddress: DataModels.IShippingAddress,
    isAddNew?: boolean,
  ) => void;
}

const AddressItem: React.FC<AddressItemProps> = ({
  addressItem,
  onSubmitShippingAddress,
}) => {
  const navigation = useNavigation();
  const { openAddEditAddressScreen } = useNavigate(navigation);

  return (
    <TouchableOpacity
      onPress={() => {
        openAddEditAddressScreen(addressItem, onSubmitShippingAddress);
      }}
    >
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {addressItem.name}
          </Text>
        </View>
        <Text style={styles.name}>{addressItem.phoneNumber}</Text>
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
          <Text style={[styles.textStyle, styles.tagText]}>Default</Text>
        </View>
      )}
      <Layouts.VSpace value={12} />
      <Divider />
      <Layouts.VSpace value={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameWrapper: {
    width: 220,
  },
  name: {
    ...FONT_STYLES.BOLD_14,
    marginRight: 8,
  },
  defaultTag: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.error50,
    padding: 4,
    width: 70,
    alignItems: 'center',
    marginBottom: 12,
  },
  textStyle: {
    ...FONT_STYLES.REGULAR_14,
    lineHeight: 18,
  },
  tagText: {
    color: COLORS.error50,
  },
});

export { AddressItem };
