import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
import { SEARCH_VIEW_STYLE } from '@constants';
import { searchStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface SortSectionProps {
  label: string;
  onPress: () => void;
}

const SortSection: React.FC<SortSectionProps> = ({ label, onPress }) => {
  const renderSort = () => {
    return (
      <View style={styles.filterContainer}>
        <MaterialCommunityIcons
          name="sort-variant"
          size={24}
          color={COLORS.primaryBlack}
        />
        <Layouts.HSpace value={8} />
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.SEMIBOLD_14,
              }}
            >
              {label}
            </Text>
            <Layouts.HSpace value={8} />
            <Entypo name="chevron-down" size={24} color={COLORS.primaryBlack} />
          </View>
        </TouchableOpacity>
        <Layouts.MaxSpace />
        {/* <TouchableOpacity
          onPress={() => {
            searchStore.setViewStyle(SEARCH_VIEW_STYLE.grid);
          }}
        >
          <MaterialCommunityIcons
            name="view-grid"
            size={24}
            color={searchStore.getViewStyleIconColor(SEARCH_VIEW_STYLE.grid)}
          />
        </TouchableOpacity> */}
        <Layouts.HSpace value={4} />
        <TouchableOpacity
          onPress={() => {
            searchStore.setViewStyle(SEARCH_VIEW_STYLE.list);
          }}
        >
          <MaterialIcons
            name="view-list"
            color={searchStore.getViewStyleIconColor(SEARCH_VIEW_STYLE.list)}
            size={30}
          />
        </TouchableOpacity>
        <Layouts.HSpace value={4} />
        <TouchableOpacity
          onPress={() => {
            searchStore.setViewStyle(SEARCH_VIEW_STYLE.complex);
          }}
        >
          <MaterialIcons
            name="featured-play-list"
            size={25}
            color={searchStore.getViewStyleIconColor(SEARCH_VIEW_STYLE.complex)}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return <>{renderSort()}</>;
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

const observable = observer(SortSection);
export { observable as SortSection };
