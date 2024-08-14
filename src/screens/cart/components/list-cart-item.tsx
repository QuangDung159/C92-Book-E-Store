import { FlashList } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';
import { CartItem } from './cart-item';

interface ListCartItemProps {
  listItem: Array<DataModels.ICartItem>;
}

const ListCartItem: React.FC<ListCartItemProps> = ({ listItem }) => {
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');

  const { openHomeScreen } = useNavigate(navigation);
  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.book.id}
        estimatedItemSize={186}
        renderItem={({ item }) => {
          return <CartItem bookCartItem={item} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View
              style={[
                styles.emptyContainer,
                {
                  height: height * 0.7,
                },
              ]}
            >
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
