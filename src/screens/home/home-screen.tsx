/* eslint-disable react-hooks/exhaustive-deps */
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { ImageAssets } from '@assets';
import { Layouts, SearchBar } from '@components';
import { useNavigate } from '@hooks';
import { appModel, searchStore, sharedStore, userStore } from '@store';
import { COLORS } from '@themes';
import { BestDealCarousel, HorizontalListCard } from './components';

const HomeScreen = ({ navigation }: any) => {
  const { handleNavigateFromLinking } = useNavigate(navigation);
  const lastNotification = Notifications.useLastNotificationResponse();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    sharedStore.getGeoLocation();
  }, []);

  useEffect(() => {
    // handle when launch app by app-link
    const navigateToInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleNavigateFromLinking(initialUrl);
      }
    };
    navigateToInitialUrl();
  }, []);

  useEffect(() => {
    // handle when launch app by notification
    if (lastNotification) {
      handleNavigateFromLinking(
        lastNotification.notification.request.content?.data?.url,
      );
    }
  }, [lastNotification]);

  const onLoadHomeData = async () => {
    await appModel.loadMasterData();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onLoadHomeData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        showCartIcon={userStore.authenticated}
        navigation={navigation}
      />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});

const observable = observer(HomeScreen);
export { observable as HomeScreen };
