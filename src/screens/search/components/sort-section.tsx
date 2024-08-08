import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layouts } from '@components';
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
        <MaterialCommunityIcons name="view-grid" size={24} />
        <Layouts.HSpace value={4} />
        <MaterialIcons name="view-list" size={30} />
        <Layouts.HSpace value={4} />
        <MaterialIcons name="featured-play-list" size={25} />
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

export { SortSection };
