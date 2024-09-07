import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Buttons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface BottomCheckoutSectionProps {
  onPress: () => void;
  priceDisplay: number;
  disabled?: boolean;
  buttonTitle?: string;
  priceNotSale?: number;
}

const BottomCheckoutSection: React.FC<BottomCheckoutSectionProps> = ({
  onPress,
  priceDisplay,
  disabled,
  buttonTitle,
  priceNotSale,
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Layouts.VSpace value={10} />
      <View style={styles.totalWrapper}>
        <View style={styles.priceSection}>
          {Boolean(priceNotSale) && (
            <Text style={styles.notSale}>
              {StringHelpers.formatCurrency(priceNotSale)}
            </Text>
          )}
          <Text style={styles.total}>
            {StringHelpers.formatCurrency(priceDisplay)}
          </Text>
        </View>
        <Buttons.CButton
          style={styles.buttonStyle}
          onPress={() => onPress?.()}
          label={buttonTitle || 'Checkout'}
          buttonType="primary"
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
  totalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    ...FONT_STYLES.BOLD_22,
  },
  notSale: {
    ...FONT_STYLES.REGULAR_16,
    textDecorationLine: 'line-through',
  },
  buttonStyle: {
    width: 150,
  },
  priceSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export { BottomCheckoutSection };
