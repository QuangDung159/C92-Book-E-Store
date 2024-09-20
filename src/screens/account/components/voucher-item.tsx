import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface VoucherItemProps {
  voucher: DataModels.IVoucher;
}

const VoucherItem: React.FC<VoucherItemProps> = ({ voucher }) => {
  const navigation = useNavigation();

  const discountValue = useMemo(() => {
    if (voucher.type === 'fix') {
      return '-' + StringHelpers.formatCurrency(voucher.discountValue);
    }
    return '-' + voucher.discountValue + '%';
  }, [voucher]);

  return (
    <TouchableOpacity
      onPress={() => {
        // select this voucher
        navigation.goBack();
      }}
    >
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={1}>
            {voucher.code}
          </Text>
        </View>
        <Text style={styles.name}>{discountValue}</Text>
      </View>
      <Layouts.VSpace value={4} />
      <Text style={styles.textStyle}>{voucher.description}</Text>
      <Layouts.VSpace value={24} />
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

export { VoucherItem };
