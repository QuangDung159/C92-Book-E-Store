import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import {
  AddToCartButton,
  BookCardPrice,
  BookHeartIcon,
  BookTitle,
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
  const navigation = useNavigation();

  return (
    <React.Fragment key={bookCardItem.id}>
      <View
        style={[
          styles.conatiner,
          index % 2 === 0 ? styles.left : styles.right,
          containerStyle,
        ]}
      >
        <BookHeartIcon
          bookCardItem={bookCardItem}
          containerStyle={styles.heartIconWrapper}
        />
        <Image
          style={{
            width: 150,
            height: 200,
            alignSelf: 'center',
          }}
          source={bookCardItem.image}
          contentFit="contain"
        />
        <Layouts.VSpace value={12} />
        <View style={styles.info}>
          <Text style={styles.stock}>
            {bookCardItem.category?.name || 'N/a'}
          </Text>
          <Layouts.VSpace value={4} />
          <View style={styles.inforSection}>
            <BookTitle navigation={navigation} book={bookCardItem} />
            <Text style={styles.author}>
              {bookCardItem.author?.name || 'N/a'}
            </Text>
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
          >{`Stock: ${bookCardItem.stock > 99 ? '99+' : bookCardItem.stock}`}</Text>
          <BookCardPrice
            price={bookCardItem.price}
            priceNotSale={bookCardItem.priceNotSale}
            containerStyle={styles.priceContainer}
          />
          <Layouts.VSpace value={6} />
          <View
            style={{
              alignSelf: 'center',
            }}
          >
            <AddToCartButton
              itemCount={bookCardItem.count || 1}
              bookCardItem={bookCardItem}
              showCount={false}
              buttonType="text-icon"
            />
          </View>
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
    borderColor: COLORS.gray200,
    borderWidth: 1,
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
