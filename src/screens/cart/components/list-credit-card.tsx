import React from 'react';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { DataModels } from '@models';
import { CreditCardItem } from './credit-card-item';

interface ListCreditCardProps {
  listCreditCard: DataModels.ICreditCard[];
  onValueChange: (value: string) => void;
  selectedValue: string;
}

const ListCreditCard: React.FC<ListCreditCardProps> = ({
  listCreditCard,
  onValueChange,
  selectedValue,
}) => {
  return (
    <View>
      {listCreditCard.length > 0 ? (
        <RadioButton.Group onValueChange={onValueChange} value={selectedValue}>
          {listCreditCard.map((item) => {
            return (
              <React.Fragment key={item.cardNumber}>
                <CreditCardItem cardItem={item} />
              </React.Fragment>
            );
          })}
        </RadioButton.Group>
      ) : (
        <Text>Add new credit card</Text>
      )}
    </View>
  );
};

export { ListCreditCard };
