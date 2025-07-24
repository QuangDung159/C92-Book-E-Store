import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
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
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface CartItemProps {
  bookCartItem: DataModels.ICartItem;
  containerStyle?: StyleProp<ViewStyle>;
  type?: 'full' | 'short';
}

const CartItem: React.FC<CartItemProps> = ({
  bookCartItem,
  containerStyle,
  type = 'full',
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;
  const navigation = useNavigation();

  const isFull = type === 'full';

  return (
    <React.Fragment key={bookCartItem.book.id}>
      <View
        style={[
          styles.container,
          { width: width - 48 },
          !isFull && {
            height: 120,
          },
          containerStyle,
        ]}
      >
        <View style={styles.info}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={bookCartItem.book.image || ImageAssets.bookImage1}
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
              <View
                style={[
                  styles.title,
                  !isFull && {
                    width: '100%',
                  },
                ]}
              >
                <BookTitle
                  style={[
                    styles.title,
                    !isFull && {
                      width: '100%',
                    },
                  ]}
                  navigation={navigation}
                  book={bookCartItem.book}
                  showFullName={!isFull}
                />
              </View>
              {isFull && (
                <>
                  <Layouts.MaxSpace />
                  <Icons.CloseIcon
                    onPress={() => {
                      cartStore.deleteCartItem(bookCartItem.id);
                    }}
                  />
                </>
              )}
            </View>
            {isFull ? (
              <BookCardInfo book={bookCartItem.book} />
            ) : (
              <>
                <Layouts.VSpace value={4} />
                <Text style={styles.author}>
                  {bookCartItem.book.author.name}
                </Text>
                <Layouts.MaxSpace />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <BookCardPrice
                    price={
                      bookCartItem.price !== 0
                        ? bookCartItem.price
                        : bookCartItem.book.price
                    }
                    priceNotSale={
                      !bookCartItem.price && bookCartItem.book.priceNotSale
                    }
                  />
                  <Text
                    style={{
                      ...FONT_STYLES.SEMIBOLD_16,
                    }}
                  >{`x${bookCartItem.count}`}</Text>
                </View>
                <Layouts.VSpace value={10} />
              </>
            )}
          </View>
        </View>
        {isFull && (
          <View style={styles.priceWrapper}>
            <BookCardPrice
              price={bookCartItem.book.price}
              priceNotSale={bookCartItem.book.priceNotSale}
            />
            <Layouts.MaxSpace />
            <CartUpdateNumber
              itemCount={bookCartItem.count}
              bookCartItem={bookCartItem}
            />
          </View>
        )}
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite,
    height: 178,
    borderRadius: 8,
    borderColor: COLORS.gray200,
    borderWidth: 1,
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
  author: {
    ...FONT_STYLES.SEMIBOLD_12,
  },
});

export { CartItem };
