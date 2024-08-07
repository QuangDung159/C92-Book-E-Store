import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layouts, SearchBar } from '@components';
import { CATEGORY } from '@constants';
import { COLORS } from '@themes';
import { CategoryList } from './components';

const CategoriesScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <SearchBar showCartIcon />
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <CategoryList list={CATEGORY} />
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
