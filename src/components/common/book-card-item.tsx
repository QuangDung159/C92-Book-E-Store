import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ImageAssets } from '@assets';
import {
  BookCardCarousel,
  BookCardPrice,
  BookTitle,
  Icons,
  Layouts,
} from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { cartStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { ToastHelpers } from '@utils';

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
  const navigation = useNavigation();
  const { openCartScreen } = useNavigate(navigation);

  const carouselWidth = (width - 48 - 12) / 2;
  const carouselHeight = carouselWidth * 1.3;

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
          <Text style={styles.stock}>{bookCardItem.category.name}</Text>
          <Layouts.VSpace value={4} />
          <View style={styles.inforSection}>
            <BookTitle navigation={navigation} book={bookCardItem} />
            <Text style={styles.author}>{bookCardItem.author.name}</Text>
          </View>
          <StarRatingDisplay
            rating={bookCardItem.rating}
            starSize={16}
            color={COLORS.error50}
            starStyle={{
              marginLeft: -2,
            }}
          />
          <Text
            style={styles.stock}
          >{`In stock: ${bookCardItem.stock} pcs`}</Text>
          <BookCardPrice
            price={bookCardItem.price}
            priceNotSale={bookCardItem.priceNotSale}
            containerStyle={styles.priceContainer}
          />
          <Layouts.VSpace value={6} />
          <TouchableOpacity
            onPress={() => {
              cartStore.addToCart({
                book: bookCardItem,
                count: 1,
              });

              ToastHelpers.showToast({
                title: 'Add to cart success',
                content: 'View cart',
                onPress: () => openCartScreen(),
              });
            }}
            style={{
              borderRadius: 50,
              backgroundColor: COLORS.primaryBlack,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
              height: 40,
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.BOLD_14,
                color: COLORS.primaryWhite,
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
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
    width: Platform.select({
      ios: 100,
      android: 95,
    }),
    height: Platform.select({
      ios: 100,
      android: 95,
    }),
    flex: 1,
    marginTop: Platform.select({
      ios: -30,
      android: -24,
    }),
  },
  info: {
    marginTop: -24,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  inforSection: {
    height: 60,
  },
  stock: {
    ...FONT_STYLES.REGULAR_12,
  },
  author: {
    ...FONT_STYLES.SEMIBOLD_12,
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
  priceContainer: {
    height: 40,
    justifyContent: 'flex-end',
  },
});

export { BookCardItem };
