import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icons } from '@components';
import { COLORS } from '@themes';

interface NotificationHiddenItemProps {
  hiddenItemHeight: number;
  hiddenItemWidth: number;
  onPressDeleteNotification: () => void;
  width: number;
}

const NotificationHiddenItem: React.FC<NotificationHiddenItemProps> = ({
  hiddenItemHeight,
  onPressDeleteNotification,
  hiddenItemWidth,
  width,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressDeleteNotification();
      }}
      activeOpacity={1}
    >
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
              onPressDeleteNotification();
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export { NotificationHiddenItem };
