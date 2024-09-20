import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface VoucherItemProps {
  voucher: DataModels.IVoucher;
  onPress?: () => void;
  isActive?: boolean;
  isSelected?: boolean;
}

const VoucherItem: React.FC<VoucherItemProps> = ({
  voucher,
  onPress,
  isActive,
  isSelected,
}) => {
  const discountValue = useMemo(() => {
    if (voucher.type === 'fix') {
      return '-' + StringHelpers.formatCurrency(voucher.discountValue);
    }
    return '-' + voucher.discountValue + '%';
  }, [voucher]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress?.();
      }}
      disabled={!isActive}
      activeOpacity={0.5}
    >
      <View
        style={[
          !isActive && {
            opacity: 0.5,
          },
        ]}
      >
        <View style={[styles.container]}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name} numberOfLines={1}>
              {voucher.code}
            </Text>
          </View>
          <Text style={styles.name}>{discountValue}</Text>
        </View>
        <Layouts.VSpace value={8} />
        <Text style={styles.textStyle}>{voucher.description}</Text>
      </View>
      {isSelected && (
        <>
          <Layouts.VSpace value={8} />
          <View style={styles.defaultTag}>
            <Text style={[styles.textStyle, styles.tagText]}>Selected</Text>
          </View>
        </>
      )}
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
    width: 80,
    alignItems: 'center',
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
