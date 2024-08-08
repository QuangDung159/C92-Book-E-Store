import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Layouts, ListBookCardVerticalRow, SearchBar } from '@components';
import { TOP_BOOKS } from '@constants';
import { searchStore } from '@store';
import { COLORS } from '@themes';
import { SortSection } from './components';

const SearchScreen = ({ route, navigation }: any) => {
  const renderFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <MaterialCommunityIcons name="filter" size={24} />
        <Layouts.HSpace value={8} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route?.params?.category && (
            <Chip
              label={route?.params?.category}
              onRemove={() => {}}
              value={route?.params?.category}
              showRemove
            />
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar showCartIcon showBackIcon navigation={navigation} />
      <SortSection onPress={() => {}} label={searchStore.sortOption.label} />
      <Layouts.VSpace value={12} />
      {renderFilter()}
      <Layouts.VSpace value={12} />
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <ListBookCardVerticalRow listItem={TOP_BOOKS} />
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export { SearchScreen };
