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
import { AddToCartButton, BookCardPrice, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemVerticalProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardItemVertical: React.FC<BookCardItemVerticalProps> = ({
  bookCardItem,
  containerStyle,
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;

  return (
    <React.Fragment key={bookCardItem.id}>
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
              <Text numberOfLines={2} style={styles.title}>
                {bookCardItem.name}
              </Text>
              <Layouts.MaxSpace />
              {bookCardItem.isLiked ? (
                <Icons.HeartIcon size={20} />
              ) : (
                <Icons.HeartOutlineIcon size={20} />
              )}
            </View>
            <Layouts.VSpace value={8} />
            <Text style={styles.subTitle}>{bookCardItem.author}</Text>
            <Layouts.VSpace value={8} />
            <Text style={styles.subTitle}>Rating: 4.9</Text>
            <Layouts.VSpace value={8} />
            <Text style={styles.stock}>In stock: 10 pcs</Text>
          </View>
        </View>
        <View style={styles.priceWrapper}>
          <BookCardPrice price={bookCardItem.price} />
          <Layouts.MaxSpace />
          <AddToCartButton itemCount={20} />
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
    ...FONT_STYLES.SEMIBOLD_16,
    width: '90%',
  },
  subTitle: {
    ...FONT_STYLES.REGULAR_10,
  },
  stock: {
    ...FONT_STYLES.SEMIBOLD_14,
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

export { BookCardItemVertical };
