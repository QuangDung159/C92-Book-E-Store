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
  BookCardInfo,
  BookCardPrice,
  BookTitle,
  Icons,
  Layouts,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemComplexProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardItemComplex: React.FC<BookCardItemComplexProps> = ({
  bookCardItem,
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
    <React.Fragment key={bookCardItem.id}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageWrapper}>
          <View style={styles.heartIconWrapper}>
            {bookCardItem.isLiked ? (
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
        <BookTitle navigation={navigation} book={bookCardItem} />
        <Layouts.VSpace value={6} />
        <BookCardInfo book={bookCardItem} />
        <Layouts.VSpace value={6} />
        <Text style={styles.description}>{bookCardItem.description}</Text>
        <Layouts.VSpace value={6} />
        <View style={styles.priceWrapper}>
          <BookCardPrice price={bookCardItem.price} />
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

export { BookCardItemComplex };
