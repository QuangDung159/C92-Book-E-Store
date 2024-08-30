import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { CartItem } from 'screens/cart';

interface OrderItemProps {
  orderItem: DataModels.IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem }) => {
  const cart = orderItem.cart;
  const listCartItem = cart.listCartItem;
  const bookCartItem = listCartItem[0];

  const [isShowCartItem, setIsShowCartItem] = useState(false);

  const navigation = useNavigation();
  const { openOrderDetailScreen } = useNavigate(navigation);

  const onPressSeeMore = () => {
    setIsShowCartItem(!isShowCartItem);
  };

  return (
    <React.Fragment key={orderItem.id}>
      <View
        style={{
          alignSelf: 'center',
          marginTop: 24,
          backgroundColor: COLORS.gray200,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity onPress={openOrderDetailScreen}>
          <CartItem
            bookCartItem={bookCartItem}
            type="short"
            containerStyle={{
              marginBottom: -12,
            }}
          />
        </TouchableOpacity>
        <Collapsible collapsed={!isShowCartItem}>
          {listCartItem.map((item, index) => {
            if (index !== 0) {
              return (
                <CartItem key={item.id} bookCartItem={item} type="short" />
              );
            }
            return null;
          })}
        </Collapsible>
        {listCartItem.length > 1 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <TouchableOpacity onPress={onPressSeeMore}>
              <Text
                style={{
                  textAlign: 'center',
                  ...FONT_STYLES.REGULAR_14,
                }}
              >
                See more
              </Text>
            </TouchableOpacity>
            {isShowCartItem ? (
              <Icons.ChevronUpIcon
                size={16}
                color={COLORS.gray60}
                onPress={onPressSeeMore}
              />
            ) : (
              <Icons.ChevronDownIcon
                size={16}
                color={COLORS.gray60}
                onPress={onPressSeeMore}
              />
            )}
          </View>
        )}
        <View
          style={{
            padding: 8,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.REGULAR_14,
              }}
            >{`Total (${listCartItem.length} products):`}</Text>
            <Layouts.MaxSpace />
            <Text
              style={{
                ...FONT_STYLES.SEMIBOLD_14,
              }}
            >
              {StringHelpers.formatCurrency(cart.total)}
            </Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const observable = observer(OrderItem);
export { observable as OrderItem };
