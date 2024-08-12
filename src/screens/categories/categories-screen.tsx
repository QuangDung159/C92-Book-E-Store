import { Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Layouts, SearchBar } from '@components';
import { CATEGORY } from '@constants';
import { useNavigate } from '@hooks';
import { categoryStore, searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { CategoryList } from './components';

const CategoriesScreen = ({ navigation }: any) => {
  const { openSearchScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <SearchBar showCartIcon navigation={navigation} showSearch />
      {categoryStore.categorySelected && (
        <TouchableOpacity
          onPress={() => {
            const parent = CATEGORY.find(
              (item) => categoryStore.categorySelected.parent === item.id,
            );

            categoryStore.setCategorySelected(parent);
          }}
        >
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
        </TouchableOpacity>
      )}
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={12} />
        <CategoryList
          list={
            categoryStore.selectedChild.length != 0
              ? categoryStore.selectedChild
              : CATEGORY
          }
          onPress={(categorySelected) => {
            if (categorySelected.hasChild) {
              const listChild = categoryStore.selectedChild;
              if (listChild || listChild.length > 0) {
                categoryStore.setCategorySelected(categorySelected);
              }
            } else {
              openSearchScreen();
              searchStore.setSearchFilter({
                category: categorySelected.id,
              });
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
