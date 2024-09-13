import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Icons } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { userStore } from '@store';
import { ToastHelpers } from '@utils';

interface BookHeartIconProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookHeartIcon: React.FC<BookHeartIconProps> = ({
  bookCardItem,
  containerStyle,
}) => {
  const navigation = useNavigation();

  const { openSignInScreen } = useNavigate(navigation);

  const onPressFavorite = async (isFavorite: boolean) => {
    if (!userStore.authenticated) {
      ToastHelpers.showToast({
        title: 'Please sign in first',
        type: 'error',
        onPress: () => {
          openSignInScreen();
        },
      });

      return;
    }

    const listBookLiked = [...userStore.userProfile.listBookLiked];

    if (isFavorite) {
      listBookLiked.push(bookCardItem.id);
    } else {
      const index = listBookLiked.findIndex((item) => item === bookCardItem.id);

      if (index !== -1) {
        listBookLiked.splice(index, 1);
      }
    }

    await userStore.updateUser({
      ...userStore.userProfile,
      listBookLiked,
    });

    userStore.fetchListInAccountView('favorite');
  };

  return (
    <View style={containerStyle}>
      {userStore.isBookFavorite(bookCardItem.id) ? (
        <Icons.HeartIcon
          size={18}
          onPress={() => {
            onPressFavorite(false);
          }}
        />
      ) : (
        <Icons.HeartOutlineIcon
          size={18}
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
