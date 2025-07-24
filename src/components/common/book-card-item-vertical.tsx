import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
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
  AddToCartButton,
  BookCardInfo,
  BookCardPrice,
  BookHeartIcon,
  BookTitle,
  Layouts,
} from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemVerticalProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
  onUpdateCount?: (countNumber: number) => void;
}

const BookCardItemVertical: React.FC<BookCardItemVerticalProps> = ({
  bookCardItem,
  containerStyle,
  onUpdateCount,
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = width - 48;
  const navigation = useNavigation();

  return (
    <React.Fragment key={bookCardItem.id}>
      <View style={[styles.container, { width: width - 48 }, containerStyle]}>
        <View style={styles.info}>
          <Image
            style={styles.image}
            contentFit="contain"
            source={bookCardItem.image || ImageAssets.bookImage1}
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
                  book={bookCardItem}
                />
              </View>
              <Layouts.MaxSpace />
              <BookHeartIcon bookCardItem={bookCardItem} />
            </View>
            <BookCardInfo book={bookCardItem} />
          </View>
        </View>
        <Layouts.VSpace value={8} />
        <View style={styles.priceWrapper}>
          <BookCardPrice
            price={bookCardItem.price}
            priceNotSale={bookCardItem.priceNotSale}
          />
          <Layouts.MaxSpace />
          <AddToCartButton
            itemCount={bookCardItem.count}
            onUpdateCount={onUpdateCount}
            bookCardItem={bookCardItem}
          />
        </View>
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 185,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
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
