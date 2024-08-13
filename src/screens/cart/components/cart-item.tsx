import { useNavigation } from 'expo-router';
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
  AddToCartButton,
  BookCardCarousel,
  BookCardPrice,
  BookTitle,
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

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  const navigation = useNavigation();

  const data = [
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
  ];

  return (
    <React.Fragment key={bookCartItem.id}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageWrapper}>
          <View style={styles.heartIconWrapper}>
            {bookCartItem.isLiked ? (
              <Icons.HeartIcon size={20} />
            ) : (
              <Icons.HeartOutlineIcon size={20} />
            )}
          </View>
          <BookCardCarousel
            carouselHeight={carouselHeight}
            carouselWidth={carouselWidth}
            data={data}
            imageStyle={styles.image}
            dotStyle={styles.dot}
          />
        </View>
        <Layouts.VSpace value={12} />
        <BookTitle navigation={navigation} book={bookCartItem} />
        <Text style={styles.stock}>{bookCartItem.author.name}</Text>
        <Layouts.VSpace value={6} />
        <Text style={styles.stock}>{bookCartItem.category.name}</Text>
        <Layouts.VSpace value={6} />
        <Text style={styles.stock}>Rating: 4.9</Text>
        <Layouts.VSpace value={6} />
        <Text style={styles.stock}>In stock: 10 pcs</Text>
        <Layouts.VSpace value={6} />
        <Text style={styles.description}>{bookCartItem.description}</Text>
        <Layouts.VSpace value={6} />
        <View style={styles.priceWrapper}>
          <BookCardPrice price={bookCartItem.price} />
          <Layouts.MaxSpace />
          <AddToCartButton itemCount={10} />
        </View>
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: COLORS.gray200,
    padding: 12,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  heartIconWrapper: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    top: -4,
  },
  image: {
    width: 200 * 0.64,
    height: 200,
  },
  stock: {
    ...FONT_STYLES.SEMIBOLD_10,
  },
  priceWrapper: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    ...FONT_STYLES.REGULAR_14,
  },
  dot: {
    marginTop: 12,
  },
});

export { CartItem };
