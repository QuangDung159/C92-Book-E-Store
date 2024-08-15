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
}

const BottomCheckoutSection: React.FC<BottomCheckoutSectionProps> = ({
  onPress,
  priceDisplay,
  disabled,
  buttonTitle,
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Layouts.VSpace value={12} />
      <View style={styles.totalWrapper}>
        <Text style={styles.total}>
          {StringHelpers.formatCurrency(priceDisplay)}
        </Text>
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
  buttonStyle: {
    width: 150,
  },
});

export { BottomCheckoutSection };