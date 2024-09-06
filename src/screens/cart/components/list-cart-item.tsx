import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { CartItem } from './cart-item';

interface ListCartItemProps {
  listItem: Array<DataModels.ICartItem>;
  type?: 'full' | 'short';
  allowSwipe?: boolean;
}

const ListCartItem: React.FC<ListCartItemProps> = ({
  listItem,
  type = 'full',
  allowSwipe = true,
}) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;

  const isFull = type === 'full';

  const { openHomeScreen } = useNavigate(navigation);
  return (
    <View style={styles.container}>
      <SwipeListView
        data={listItem}
        renderItem={({ item }) => <CartItem bookCartItem={item} type={type} />}
        disableRightSwipe
        disableLeftSwipe={!allowSwipe}
        renderHiddenItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.error50,
                height: isFull ? 178 : 120,
                borderRadius: 8,
                width: cardWidth - 5,
                alignSelf: 'flex-end',
                flexDirection: 'row',
              }}
              onPress={() => cartStore.deleteCartItem(item.id)}
            >
              <View
                style={{
                  width: cardWidth - 75 - 5,
                }}
              ></View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 75,
                }}
              >
                <Icons.TrashIcon
                  color={COLORS.primaryWhite}
                  size={24}
                  onPress={() => cartStore.deleteCartItem(item.id)}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListEmptyComponent={() => {
          return (
            <View style={[styles.emptyContainer]}>
              <Icons.CartHeartIcon size={60} />
              <Layouts.VSpace value={12} />
              <Text style={styles.textEmpty}>Cart empty</Text>
              <Layouts.VSpace value={12} />
              <Buttons.CButton
                buttonType="primary"
                label={`Let's shop now`}
                onPress={() => {
                  openHomeScreen();
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textEmpty: {
    ...FONT_STYLES.REGULAR_16,
  },
  container: {
    marginBottom: 12,
    marginTop: 24,
  },
});

export { ListCartItem };
