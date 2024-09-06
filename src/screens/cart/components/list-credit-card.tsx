import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Buttons } from '@components';
import { DataModels } from '@models';
import { CreditCardItem } from './credit-card-item';

interface ListCreditCardProps {
  listCreditCard: DataModels.ICreditCard[];
  onValueChange: (value: string) => void;
  selectedValue: string;
  onPressAddCreditCard: () => void;
}

const ListCreditCard: React.FC<ListCreditCardProps> = ({
  listCreditCard,
  onValueChange,
  selectedValue,
  onPressAddCreditCard,
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
        <View style={styles.addNew}>
          <Buttons.CButton
            onPress={() => {
              onPressAddCreditCard();
            }}
            label="Add new Credit Card"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addNew: {
    marginTop: 12,
    height: 48,
  },
});

export { ListCreditCard };
