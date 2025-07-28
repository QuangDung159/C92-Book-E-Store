import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
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

interface BookCardItemComplexProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
  onUpdateCount?: (countNumber: number) => void;
}

const BookCardItemComplex: React.FC<BookCardItemComplexProps> = ({
  bookCardItem,
  containerStyle,
  onUpdateCount,
}) => {
  const navigation = useNavigation();

  return (
    <React.Fragment key={bookCardItem.id}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.imageWrapper}>
          <BookHeartIcon
            bookCardItem={bookCardItem}
            containerStyle={styles.heartIconWrapper}
          />
          <Image
            style={{
              width: 300,
              height: 320,
              alignSelf: 'center',
            }}
            source={bookCardItem.image}
            contentFit="contain"
          />
        </View>
        <Layouts.VSpace value={12} />
        <BookTitle navigation={navigation} book={bookCardItem} />
        <Layouts.VSpace value={6} />
        <BookCardInfo book={bookCardItem} />
        <Layouts.VSpace value={6} />
        <Text style={styles.description}>
          {bookCardItem.description || 'N/a'}
        </Text>
        <Layouts.VSpace value={6} />
        <View style={styles.priceWrapper}>
          <BookCardPrice
            price={bookCardItem.price}
            priceNotSale={bookCardItem.priceNotSale}
          />
          <Layouts.MaxSpace />
          <AddToCartButton
            itemCount={bookCardItem.count}
            bookCardItem={bookCardItem}
            onUpdateCount={onUpdateCount}
            buttonType="text-icon"
            showCount={false}
          />
        </View>
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderColor: COLORS.gray200,
    padding: 12,
    borderWidth: 1,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  heartIconWrapper: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    top: -4,
    zIndex: 999,
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
