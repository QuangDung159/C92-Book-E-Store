import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

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
  const getColor = (isSelected: boolean) => ({
    backgroundColor: isSelected ? COLORS.primaryBlack : COLORS.primaryWhite,
    color: isSelected ? COLORS.primaryWhite : COLORS.primaryBlack,
  });

  return (
    <View style={styles.container}>
      {listFilter.map((item) => {
        const isSelected = item.value === selectedValue;
        return (
          <React.Fragment key={item.value}>
            <TouchableWithoutFeedback onPress={() => onPress(item)}>
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: getColor(isSelected).backgroundColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: getColor(isSelected).color,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Layouts.HSpace value={12} />
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 8,
    borderColor: COLORS.primaryBlack,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...FONT_STYLES.SEMIBOLD_12,
    padding: 8,
  },
});

export { TopBooksFilter };
