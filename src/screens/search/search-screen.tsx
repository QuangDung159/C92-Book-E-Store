import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BookCardItem, Layouts, SearchBar } from '@components';
import { TOP_BOOKS } from '@constants';
import { COLORS, FONT_STYLES } from '@themes';

const SearchScreen = ({ route, navigation }: any) => {
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48 - 24) / 2;

  const renderFilterItem = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.gray200,
          borderRadius: 8,
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 4,
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            ...FONT_STYLES.SEMIBOLD_14,
          }}
        >
          {route?.params?.category}
        </Text>
        <Layouts.HSpace value={4} />
        <MaterialCommunityIcons name="close-circle" size={20} />
      </View>
    );
  };

  const renderRowItem = () => {
    return (
      <React.Fragment>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <BookCardItem
            containerStyle={{
              width: cardWidth,
            }}
            bookCardItem={TOP_BOOKS[0]}
          />
          <Layouts.HSpace value={12} />
          <BookCardItem
            containerStyle={{
              width: cardWidth,
            }}
            bookCardItem={TOP_BOOKS[0]}
          />
        </View>
        <Layouts.VSpace value={36} />
      </React.Fragment>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryWhite,
        paddingHorizontal: 24,
        paddingTop: 12,
      }}
    >
      <SearchBar showCartIcon showBackIcon navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <MaterialCommunityIcons name="filter" size={24} />
        <Layouts.HSpace value={8} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderFilterItem()}
          {renderFilterItem()}
          {renderFilterItem()}
          {renderFilterItem()}
          {renderFilterItem()}
        </ScrollView>
      </View>
      <Layouts.VSpace value={12} />
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        {renderRowItem()}
        {renderRowItem()}
        {renderRowItem()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export { SearchScreen };
