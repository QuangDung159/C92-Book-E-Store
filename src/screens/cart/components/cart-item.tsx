import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ImageAssets } from '@assets';
import {
  BookCardInfo,
  BookCardPrice,
  BookTitle,
  CartUpdateNumber,
  Icons,
  Layouts,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface CartItemProps {
  bookCartItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
}

const CartItem: React.FC<CartItemProps> = ({
  bookCartItem,
  containerStyle,
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;
  const navigation = useNavigation();

  return (
    <React.Fragment key={bookCartItem.id}>
      <View style={[styles.container, { width: width - 48 }, containerStyle]}>
        <View style={styles.info}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={ImageAssets.bookImage1}
            transition={500}
          />
          <View
            style={[
              styles.infoWrapper,
              {
                width: cardWidth - 90,
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View style={styles.title}>
                <BookTitle
                  style={styles.title}
                  navigation={navigation}
                  book={bookCartItem}
                />
              </View>
              <Layouts.MaxSpace />
              <Icons.CloseIcon />
            </View>
            <BookCardInfo book={bookCartItem} />
          </View>
        </View>
        <View style={styles.priceWrapper}>
          <BookCardPrice price={bookCartItem.price} />
          <Layouts.MaxSpace />
          <CartUpdateNumber itemCount={20} />
        </View>
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray200,
    height: 178,
    borderRadius: 8,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 120,
  },
  image: {
    height: 100,
    width: 90,
  },
  infoWrapper: {
    alignSelf: 'flex-start',
    paddingRight: 12,
    marginTop: 10,
  },
  title: {
    width: '90%',
  },
  priceWrapper: {
    marginHorizontal: 12,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 40,
  },
  cartNumber: {
    ...FONT_STYLES.SEMIBOLD_16,
    paddingHorizontal: 8,
    color: COLORS.primaryWhite,
  },
  cartIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
  },
});

export { CartItem };