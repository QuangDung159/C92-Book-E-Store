import { Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Layouts, SearchBar } from '@components';
import { CATEGORY } from '@constants';
import { categoryStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { CategoryList } from './components';

const CategoriesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <SearchBar showCartIcon />
      {categoryStore.categorySelected && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.gray200,
            borderRadius: 8,
            padding: 8,
            height: 40,
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 8,
            }}
          >
            <Entypo name="chevron-left" size={24} />
          </View>
          <Text
            style={{
              ...FONT_STYLES.BOLD_16,
            }}
          >
            {categoryStore.categorySelected.name}
          </Text>
        </View>
      )}
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={12} />
        <CategoryList
          list={categoryStore.categorySelected?.child || CATEGORY}
          onPress={(categorySelected) => {
            const listChild = categorySelected.child;
            if (listChild || listChild.length > 0) {
              categoryStore.setCategorySelected(categorySelected);
            }
          }}
        />
        <Layouts.VSpace value={12} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});

const observable = observer(CategoriesScreen);
export { observable as CategoriesScreen };
