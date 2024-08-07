import React from 'react';
import { View } from 'react-native';
import { Buttons, Layouts } from '@components';
import { DataModels } from '@models';

interface TopBooksFilterProps {
  listFilter: Array<DataModels.ITopBooksFilter>;
  selectedValue: string;
  onPress: (item: DataModels.ITopBooksFilter) => void;
}

const TopBooksFilter: React.FC<TopBooksFilterProps> = ({
  listFilter,
  selectedValue,
  onPress,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {listFilter.map((item) => {
        return (
          <React.Fragment key={item.value}>
            <Buttons.CButton
              buttonType={
                selectedValue === item.value ? 'primary' : 'secondary'
              }
              label={item.label}
              onPress={() => onPress(item)}
            />
            <Layouts.HSpace value={12} />
          </React.Fragment>
        );
      })}
    </View>
  );
};

export { TopBooksFilter };
