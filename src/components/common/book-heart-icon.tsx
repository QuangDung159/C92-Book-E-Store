import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icons } from '@components';
import { DataModels } from '@models';
import { userStore } from '@store';

interface BookHeartIconProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookHeartIcon: React.FC<BookHeartIconProps> = ({
  bookCardItem,
  containerStyle,
}) => {
  const onPressFavorite = async (isFavorite: boolean) => {
    const listBookLiked = [...userStore.userProfile.listBookLiked];

    if (isFavorite) {
      listBookLiked.push(bookCardItem.id);
    } else {
      const index = listBookLiked.findIndex((item) => item === bookCardItem.id);

      if (index !== 1) {
        listBookLiked.splice(index, 1);
      }
    }

    userStore.updateUser({
      ...userStore.userProfile,
      listBookLiked,
    });
  };

  return (
    <View style={containerStyle}>
      {userStore.isBookFavorite(bookCardItem.id) ? (
        <Icons.HeartIcon
          size={20}
          onPress={() => {
            onPressFavorite(false);
          }}
        />
      ) : (
        <Icons.HeartOutlineIcon
          size={20}
          onPress={() => {
            onPressFavorite(true);
          }}
        />
      )}
    </View>
  );
};

const observable = observer(BookHeartIcon);
export { observable as BookHeartIcon };
