import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface NotificationItemProps {
  hiddenItemHeight: number;
  notificationItem: DataModels.INotification;
  onPressNotification: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  hiddenItemHeight,
  notificationItem,
  onPressNotification,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressNotification();
      }}
      activeOpacity={1}
    >
      <View
        style={[
          styles.itemContainer,
          {
            height: hiddenItemHeight,
          },
          !notificationItem.readed && {
            backgroundColor: COLORS.gray200,
          },
        ]}
      >
        <View style={styles.contentWrapper}>
          <Text
            style={[
              styles.title,
              notificationItem.readed && {
                ...FONT_STYLES.REGULAR_14,
              },
            ]}
          >
            {notificationItem.title}
          </Text>
          <Text style={styles.content} numberOfLines={2}>
            {notificationItem.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    ...FONT_STYLES.BOLD_14,
    marginBottom: 4,
  },
  content: {
    ...FONT_STYLES.REGULAR_12,
  },
});

export { NotificationItem };
