import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';

interface CategoryItemProps {
  item: DataModels.ICategory;
  onPress: (categorySelected: DataModels.ICategory) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, onPress }) => {
  const { width } = Dimensions.get('window');

  return (
    <TouchableOpacity
      onPress={() => {
        if (item.hasChild) {
          onPress(item);
        }
      }}
    >
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { ...FONT_STYLES.BOLD_16 },
});

export { CategoryItem };
