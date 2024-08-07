import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Layouts } from '@components';
import { DataModels } from '@models';

interface CategoryItemProps {
  item: DataModels.ICategory;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  const { width } = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback>
      <>
        <View style={styles.container}>
          <Text
            style={[
              styles.name,
              {
                width: width - 48 - 30,
              },
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Layouts.MaxSpace />
          <Entypo name="chevron-right" size={24} />
        </View>
        <Layouts.VSpace value={12} />
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export { CategoryItem };
