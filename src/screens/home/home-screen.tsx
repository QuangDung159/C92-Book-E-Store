import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ImageAssets } from '@assets';
import { Layouts, SearchBar } from '@components';
import { searchStore, userStore } from '@store';
import { COLORS } from '@themes';
import { BestDealCarousel, HorizontalListCard } from './components';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <SearchBar
        showCartIcon={userStore.authenticated}
        navigation={navigation}
      />
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={12}></Layouts.VSpace>
        <BestDealCarousel
          data={[
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
          ]}
        />
        <Layouts.VSpace value={24} />
        {searchStore.listTopBook.length > 0 && (
          <>
            <HorizontalListCard
              listItem={searchStore.listTopBook}
              title="Top Books"
              showSeeMore
              showTopFilter
              setTopBooksSelectedFilter={(value) => {
                searchStore.setTopBookFilterSelected(value);
              }}
              topBooksSelectedFilter={searchStore.topBookFilterSelected}
            />
            <Layouts.VSpace value={48} />
          </>
        )}
        {searchStore.listTopBook.length > 0 && (
          <>
            <HorizontalListCard
              listItem={searchStore.listTopBook}
              title="Latest Books"
              showSeeMore
            />
            <Layouts.VSpace value={48} />
          </>
        )}
        {searchStore.listTopBook.length > 0 && (
          <HorizontalListCard
            listItem={searchStore.listTopBook}
            title="Upcoming Books"
            showSeeMore
          />
        )}
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

const observable = observer(HomeScreen);
export { observable as HomeScreen };
