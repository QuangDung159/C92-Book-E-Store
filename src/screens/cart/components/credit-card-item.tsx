import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Icons, Layouts } from '@components';
import { CREDIT_CARD_TYPE } from '@constants';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';

interface CreditCardItemProps {
  cardItem: DataModels.ICreditCard;
}

const CreditCardItem: React.FC<CreditCardItemProps> = ({ cardItem }) => {
  const getCardTypeIcon = () => {
    switch (cardItem.cartType) {
      case CREDIT_CARD_TYPE.masterCard:
        return <Icons.MasterCardIcon />;
      case CREDIT_CARD_TYPE.visa:
        return <Icons.VisaIcon />;
      default:
        return <Icons.JCBIcon />;
    }
  };

  return (
    <View style={styles.container}>
      <Layouts.HSpace value={20} />
      <RadioButton.Android value={cardItem.cardNumber} />
      <Layouts.HSpace value={12} />
      {getCardTypeIcon()}
      <Layouts.HSpace value={12} />
      <Text style={styles.cardNumber}>{cardItem.cardNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
});

export { CreditCardItem };
