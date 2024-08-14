import { FlashList } from '@shopify/flash-list';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Buttons } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { CartItem } from './cart-item';

interface ListCartItemProps {
  listItem: Array<DataModels.ICartItem>;
}

const ListCartItem: React.FC<ListCartItemProps> = ({ listItem }) => {
  const navigation = useNavigation();

  const { openHomeScreen } = useNavigate(navigation);
  return (
    <View
      style={{
        marginBottom: 12,
        marginTop: 24,
      }}
    >
      <FlashList
        showsVerticalScrollIndicator={false}
        data={listItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={186}
        renderItem={({ item }) => {
          return <CartItem bookCartItem={item} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>{`Let's shop now`}</Text>
              <Buttons.CButton
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

export { ListCartItem };
