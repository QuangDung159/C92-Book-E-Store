import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Chip,
  Layouts,
  ListBookCardComplex,
  ListBookCardVertical,
  ListBookCardVerticalRow,
  SearchBar,
  Sliders,
} from '@components';
import { SEARCH_VIEW_STYLE, TOP_BOOKS } from '@constants';
import { searchStore } from '@store';
import { COLORS } from '@themes';
import { SortSection } from './components';

const SearchScreen = ({ route, navigation }: any) => {
  const scrollRef = useRef<ScrollView>();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [price, setPrice] = useState([79000, 679000]);

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

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar showCartIcon showBackIcon navigation={navigation} />
      <ScrollView
        ref={scrollRef}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <Button
          title="Show Bottom Popup"
          onPress={() => setPopupVisible(true)}
        />
        <Layouts.BottomPopup
          visible={isPopupVisible}
          onClose={() => setPopupVisible(false)}
        >
          <Text style={styles.popupText}>This is a bottom popup!</Text>
          <Button title="Close" onPress={() => setPopupVisible(false)} />
          <Text>{price[0]}</Text>
          <Text>{price[1]}</Text>
          <Sliders.MultiSlider
            selctedRange={price}
            maximumValue={679000}
            minimumValue={79000}
            onSlidingComplete={setPrice}
          />
        </Layouts.BottomPopup>
        <SortSection onPress={() => {}} label={searchStore.sortOption.label} />
        <Layouts.VSpace value={12} />
        {renderFilter()}
        <Layouts.VSpace value={12} />
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.grid && (
          <ListBookCardVerticalRow listItem={TOP_BOOKS} />
        )}
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.list && (
          <ListBookCardVertical listItem={TOP_BOOKS} />
        )}
        {searchStore.viewStyle === SEARCH_VIEW_STYLE.complex && (
          <ListBookCardComplex listItem={TOP_BOOKS} />
        )}
      </ScrollView>
      <View style={styles.scrollTop}>
        <TouchableOpacity onPress={scrollToTop}>
          <Entypo name="chevron-up" size={24} />
        </TouchableOpacity>
      </View>
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
  scrollTop: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 24,
    opacity: 0.8,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const observable = observer(SearchScreen);
export { observable as SearchScreen };
