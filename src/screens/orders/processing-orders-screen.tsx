import { observer } from 'mobx-react-lite';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EmptyListComponent, Icons } from '@components';
import { notificationStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

const ProcessingOrdersScreen = () => {
  const { width } = Dimensions.get('window');
  const hiddenItemHeight = 75;
  const hiddenItemWidth = 75;

  return (
    <View style={styles.container}>
      <SwipeListView
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={notificationStore.listNotification}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              {
                height: hiddenItemHeight,
              },
            ]}
          >
            <View style={styles.contentWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content} numberOfLines={2}>
                {item.content}
              </Text>
            </View>
            <View style={styles.dot}>
              <Icons.DotSingleIcon
                color={item.readed ? COLORS.primaryWhite : COLORS.primaryBlack}
                size={30}
              />
            </View>
          </View>
        )}
        disableRightSwipe
        renderHiddenItem={({ item }) => {
          return (
            <View
              style={[
                styles.hiddenWrapper,
                {
                  height: hiddenItemHeight,
                  width: width - 5,
                },
              ]}
            >
              <View
                style={{
                  width: width - 5 - hiddenItemWidth,
                }}
              />
              <View style={styles.trashIcon}>
                <Icons.TrashIcon
                  color={COLORS.primaryWhite}
                  size={24}
                  onPress={() => {
                    console.log('item :>> ', item);
                  }}
                />
              </View>
            </View>
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
  contentWrapper: {
    flex: 9,
  },
  title: {
    ...FONT_STYLES.SEMIBOLD_14,
    marginBottom: 4,
  },
  content: {
    ...FONT_STYLES.REGULAR_14,
  },
  dot: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hiddenWrapper: {
    backgroundColor: COLORS.error50,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  trashIcon: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const observable = observer(ProcessingOrdersScreen);
export { observable as ProcessingOrdersScreen };
