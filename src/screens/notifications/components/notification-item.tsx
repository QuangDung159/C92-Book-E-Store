import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icons } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface NotificationItemProps {
  hiddenItemHeight: number;
  notificationItem: DataModels.INotification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  hiddenItemHeight,
  notificationItem,
}) => {
  return (
    <View
      style={[
        styles.itemContainer,
        {
          height: hiddenItemHeight,
        },
      ]}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{notificationItem.title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {notificationItem.content}
        </Text>
      </View>
      <View style={styles.dot}>
        <Icons.DotSingleIcon
          color={
            notificationItem.readed ? COLORS.primaryWhite : COLORS.primaryBlack
          }
          size={30}
        />
      </View>
    </View>
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
  dot: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export { NotificationItem };
