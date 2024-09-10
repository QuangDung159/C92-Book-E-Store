import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Dimensions, RefreshControl, StyleSheet, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EmptyListComponent, Icons, ScreenHeader } from '@components';
import { notificationStore } from '@store';
import { COLORS } from '@themes';
import { NotificationHiddenItem, NotificationItem } from './components';

const NotificationsScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { width } = Dimensions.get('window');

  const hiddenItemHeight = 75;
  const hiddenItemWidth = 75;

  const onLoadNotification = async () => {
    await notificationStore.loadNotification();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onLoadNotification();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        navigation={navigation}
        showBackIcon={false}
        rightConponent={() => {
          return (
            <Icons.ReadAllIcon
              onPress={() => {
                notificationStore.onReadAllNotification();
              }}
            />
          );
        }}
      />
      <SwipeListView
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={notificationStore.listNotification}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <NotificationItem
            hiddenItemHeight={hiddenItemHeight}
            notificationItem={item}
            onPressNotification={() => {
              notificationStore.onReadNotification(item.id, true);
            }}
          />
        )}
        disableRightSwipe
        renderHiddenItem={({ item }) => {
          return (
            <NotificationHiddenItem
              hiddenItemHeight={hiddenItemHeight}
              hiddenItemWidth={hiddenItemWidth}
              onPressDeleteNotification={() => {
                notificationStore.onDeleteNotification(item.id);
              }}
              width={width}
            />
          );
        }}
        leftOpenValue={hiddenItemWidth}
        rightOpenValue={-hiddenItemWidth}
        ListEmptyComponent={() => {
          return <EmptyListComponent />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
  },
  itemContainer: {
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: 24,
    borderBottomColor: COLORS.gray200,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});

const observable = observer(NotificationsScreen);
export { observable as NotificationsScreen };
