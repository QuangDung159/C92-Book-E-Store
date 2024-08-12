import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ImageAssets } from '@assets';
import { AddToCartButton, BookCardPrice, Icons, Layouts } from '@components';
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
  return (
    <React.Fragment key={bookCardItem.id}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageWrapper}>
          <View style={styles.likeViewIcon}>
            {bookCardItem.isLiked ? (
              <Icons.HeartIcon size={20} />
            ) : (
              <Icons.HeartOutlineIcon size={20} />
            )}
          </View>
          <Image
            style={styles.image}
            source={ImageAssets.bookImage1}
            contentFit="contain"
            transition={500}
          />
        </View>
        <Layouts.VSpace value={12} />
        <Text style={styles.title}>{bookCardItem.name}</Text>
        <Text style={styles.stock}>{bookCardItem.author}</Text>
        <Layouts.VSpace value={4} />
        <Text style={styles.stock}>Rating: 4.9</Text>
        <Layouts.VSpace value={4} />
        <Text style={styles.stock}>In stock: 10 pcs</Text>
        <Layouts.VSpace value={4} />
        <Text style={styles.description}>{bookCardItem.description}</Text>
        <Layouts.VSpace value={4} />
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
  likeViewIcon: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    top: -4,
  },
  image: {
    width: 200 * 0.64,
    height: 200,
  },
  title: {
    ...FONT_STYLES.BOLD_16,
  },
  stock: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
  priceWrapper: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    ...FONT_STYLES.REGULAR_14,
  },
});

export { BookCardItemComplex };
