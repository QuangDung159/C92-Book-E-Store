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
  BookCardCarousel,
  BookCardPrice,
  Buttons,
  Icons,
  Layouts,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
  index: number;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  bookCardItem,
  containerStyle,
  index,
}) => {
  const { width } = Dimensions.get('window');

  const carouselWidth = (width - 48 - 12) / 2;
  const carouselHeight = carouselWidth * 1.2;

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
      <View
        style={[
          styles.conatiner,
          index % 2 === 0 ? styles.left : styles.right,
          containerStyle,
        ]}
      >
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
        <Layouts.VSpace value={12} />
        <View style={styles.info}>
          <Text style={styles.stock}>{bookCardItem.category}</Text>
          <Layouts.VSpace value={4} />
          <View style={styles.inforSection}>
            <Text style={styles.title} numberOfLines={2}>
              {bookCardItem.name}
            </Text>
            <Text style={styles.stock}>{bookCardItem.author}</Text>
          </View>
          <Layouts.VSpace value={6} />
          <Text style={styles.stock}>Rating: 4.9</Text>
          <Layouts.VSpace value={6} />
          <Text style={styles.stock}>In stock: 10 pcs</Text>
          <Layouts.VSpace value={6} />
          <BookCardPrice price={bookCardItem.price} />
          <Layouts.VSpace value={6} />
          <Buttons.CButton
            onPress={() => {}}
            buttonType="primary"
            label="Add to cart"
          />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    borderRadius: 8,
    flex: 1,
    marginBottom: 12,
    backgroundColor: COLORS.gray200,
  },
  image: {
    width: 100,
    height: 100,
    flex: 1,
    marginTop: -24,
  },
  info: {
    marginTop: -24,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  inforSection: {
    height: 60,
  },
  title: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  stock: {
    ...FONT_STYLES.SEMIBOLD_10,
  },
  left: {
    marginRight: 6,
  },
  right: {
    marginLeft: 6,
  },
  dot: {
    marginTop: -24,
  },
  heartIconWrapper: {
    position: 'absolute',
    right: 8,
    zIndex: 99,
    top: 8,
  },
});

export { BookCardItem };
