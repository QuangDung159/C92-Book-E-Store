import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { CancelOrderButton, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { StringHelpers } from '@utils';
import { CartItem } from 'screens/cart';

interface OrderItemProps {
  orderItem: DataModels.IOrder;
  isShowFullListCart?: boolean;
  showCancelButton?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderItem,
  isShowFullListCart = false,
  showCancelButton,
}) => {
  const cart = orderItem.cart;
  const listCartItem = cart.listCartItem;
  const bookCartItem = listCartItem[0];

  const [isShowCartItem, setIsShowCartItem] = useState(false);

  const navigation = useNavigation();
  const { openOrderDetailScreen } = useNavigate(navigation);

  const onPressSeeMore = () => {
    setIsShowCartItem(!isShowCartItem);
  };

  const countProduct = () => {
    let count = 0;
    listCartItem.forEach((item) => {
      count += item.count;
    });

    return count;
  };

  const renderListCartItem = () => {
    return (
      <>
        {listCartItem.map((item) => (
          <CartItem
            key={item.id}
            bookCartItem={item}
            type="short"
            containerStyle={styles.cartItem}
          />
        ))}
      </>
    );
  };

  const renderCartInfo = (label: string, value: string) => {
    return (
      <View style={styles.totalRow}>
        <Text style={styles.totalTitle}>{label}</Text>
        <Layouts.MaxSpace />
        <Text style={styles.totalValue}>{value}</Text>
      </View>
    );
  };

  return (
    <React.Fragment key={orderItem.id}>
      <TouchableOpacity
        onPress={() => {
          openOrderDetailScreen(orderItem);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.container}>
          {isShowFullListCart ? (
            <>{renderListCartItem()}</>
          ) : (
            <>
              <CartItem
                bookCartItem={bookCartItem}
                type="short"
                containerStyle={styles.cartItem}
              />
              <Collapsible collapsed={!isShowCartItem} duration={500}>
                {listCartItem.map((item, index) => {
                  if (index !== 0) {
                    return (
                      <CartItem
                        key={item.id}
                        bookCartItem={item}
                        type="short"
                        containerStyle={styles.cartItem}
                      />
                    );
                  }
                  return null;
                })}
              </Collapsible>
              {listCartItem.length > 1 && (
                <View style={styles.seeMore}>
                  <TouchableOpacity onPress={onPressSeeMore}>
                    <Text style={styles.seeMoreText}>See more</Text>
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
            </>
          )}

          <View style={styles.totalSec}>
            {renderCartInfo(
              `Total (${countProduct()} products):`,
              StringHelpers.formatCurrency(cart.subTotal).toString(),
            )}
            <Layouts.VSpace value={4} />
            {renderCartInfo(
              'Shipping fee:',
              StringHelpers.formatCurrency(cart.shipping).toString(),
            )}
            <Layouts.VSpace value={4} />
            {renderCartInfo(
              'Discount:',
              `- ${StringHelpers.formatCurrency(cart.discount)}`,
            )}
            {showCancelButton && <CancelOrderButton order={orderItem} />}
          </View>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 24,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
  cartItem: {
    marginBottom: -12,
  },
  seeMore: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  seeMoreText: {
    textAlign: 'center',
    ...FONT_STYLES.REGULAR_14,
  },
  totalSec: {
    padding: 8,
  },
  totalRow: {
    flexDirection: 'row',
  },
  totalTitle: {
    ...FONT_STYLES.REGULAR_14,
  },
  totalValue: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
  cancelButton: {
    backgroundColor: COLORS.gray200,
    borderColor: COLORS.error50,
  },
  cancelLabel: {
    color: COLORS.error50,
  },
});

const observable = observer(OrderItem);
export { observable as OrderItem };
