import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Icons, Layouts } from '@components';
import { PAYMENT_CARD_TYPE } from '@constants';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';

interface CreditCardItemProps {
  cardItem: DataModels.ICreditCard;
  isLast?: boolean;
}

const CreditCardItem: React.FC<CreditCardItemProps> = ({
  cardItem,
  isLast,
}) => {
  const getCardTypeIcon = () => {
    switch (cardItem.cardType) {
      case PAYMENT_CARD_TYPE.masterCard:
        return <Icons.MasterCardIcon />;
      case PAYMENT_CARD_TYPE.visa:
        return <Icons.VisaIcon />;
      default:
        return <Icons.JCBIcon />;
    }
  };

  return (
    <>
      <View style={styles.container}>
        {getCardTypeIcon()}
        <Layouts.HSpace value={12} />
        <Text style={styles.cardNumber}>
          {StringHelpers.formatCardNumber(cardItem.cardNumber)}
        </Text>
        <Layouts.HSpace value={12} />
        <Text style={styles.cardNumber}>
          {StringHelpers.formatCardHolder(cardItem.cardHolder)}
        </Text>
        <Layouts.MaxSpace />
        {cardItem.primary && (
          <View style={styles.defaultTag}>
            <Text style={[styles.textStyle, styles.tagText]}>Default</Text>
          </View>
        )}
      </View>
      {isLast && <Divider />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  cardNumber: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  defaultTag: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.error50,
    padding: 4,
    width: 70,
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

export { CreditCardItem };
