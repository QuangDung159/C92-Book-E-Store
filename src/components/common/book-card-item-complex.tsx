import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ImageAssets } from '@assets';
import { Icons, Layouts } from '@components';
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
        <Text
          style={{
            ...FONT_STYLES.REGULAR_14,
          }}
        >
          {bookCardItem.description}
        </Text>
        <Layouts.VSpace value={4} />
        <View style={styles.priceWrapper}>
          <Text style={styles.price}>{bookCardItem.price}đ</Text>
          <Layouts.MaxSpace />
          <View style={styles.addToCartWrapper}>
            <View style={styles.addToCart}>
              <Icons.MinusIcon color={COLORS.primaryWhite} />
              <Text style={styles.cartNumber}>100</Text>
              <Icons.PlusIcon color={COLORS.primaryWhite} />
            </View>
          </View>
          <Layouts.HSpace value={8} />
          <View style={styles.cartIconWrapper}>
            <AntDesign
              name="shoppingcart"
              size={24}
              color={COLORS.primaryWhite}
            />
          </View>
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
  subTitle: {
    ...FONT_STYLES.REGULAR_10,
  },
  stock: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
  price: {
    ...FONT_STYLES.BOLD_18,
  },
  priceWrapper: {
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

export { BookCardItemComplex };
