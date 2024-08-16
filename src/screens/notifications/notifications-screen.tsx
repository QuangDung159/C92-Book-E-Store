import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EmptyListComponent, Icons, ScreenHeader } from '@components';
import { LIST_NOTIFICATION } from '@constants';
import { COLORS, FONT_STYLES } from '@themes';

const NotificationsScreen = ({ navigation }: any) => {
  const itemHeight = 75;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        navigation={navigation}
        showBackIcon={false}
        rightConponent={() => {
          return <Icons.ReadAllIcon />;
        }}
      />
      <SwipeListView
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={LIST_NOTIFICATION}
        renderItem={({ item }) => (
          <View
            style={{
              height: itemHeight,
              backgroundColor: COLORS.primaryWhite,
              paddingHorizontal: 24,
              borderBottomColor: COLORS.gray200,
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 9,
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.SEMIBOLD_14,
                  marginBottom: 4,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONT_STYLES.REGULAR_14,
                }}
                numberOfLines={2}
              >
                {item.content}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
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
              style={{
                backgroundColor: COLORS.error50,
                height: itemHeight,
                width: 75,
                alignSelf: 'flex-end',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
        leftOpenValue={75}
        rightOpenValue={-75}
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
});

const observable = observer(NotificationsScreen);
export { observable as NotificationsScreen };
