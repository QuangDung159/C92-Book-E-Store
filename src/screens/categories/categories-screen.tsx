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
import { useNavigate } from '@hooks';
import { categoryStore, searchStore, userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { HorizontalListCard } from 'screens/home/components';
import { CategoryList } from './components';

const CategoriesScreen = ({ navigation }: any) => {
  const { openSearchScreen } = useNavigate(navigation);

  return (
    <View style={styles.container}>
      <SearchBar
        showCartIcon={true}
        // showCartIcon={userStore.authenticated}
        navigation={navigation}
        showSearch
      />
      {categoryStore.categorySelected && (
        <TouchableOpacity
          onPress={() => {
            const parent = categoryStore.listCategory.find(
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
              marginBottom: 12,
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
              : categoryStore.listCategory
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
        <Layouts.VSpace value={24} />
        <HorizontalListCard
          listItem={searchStore.listTopBook}
          title="Maybe you will like"
        />
        <Layouts.VSpace value={24} />
        <HorizontalListCard
          listItem={searchStore.listUpcomming}
          title="New Arrivals"
          showSeeMore
        />
        <Layouts.VSpace value={24} />
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
