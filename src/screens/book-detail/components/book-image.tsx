import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BookCardCarousel, Icons } from '@components';
import { DataModels } from '@models';

interface BookImageProps {
  book: DataModels.IBook;
  navigation: any;
  data: any[];
}

const BookImage: React.FC<BookImageProps> = ({ book, navigation, data }) => {
  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  return (
    <View style={styles.imageWrapper}>
      <View style={styles.heartIconWrapper}>
        {book.isLiked ? (
          <Icons.HeartIcon size={20} />
        ) : (
          <Icons.HeartOutlineIcon size={20} />
        )}
      </View>
      <View style={styles.backIcon}>
        <Icons.ChevronLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <BookCardCarousel
        carouselHeight={carouselHeight}
        carouselWidth={carouselWidth}
        data={data}
        imageStyle={styles.image}
        dotStyle={{
          marginTop: 12,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    marginTop: 6,
  },
  heartIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 99,
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 99,
  },
  image: {
    width: 200 * 0.64,
    height: 200,
  },
});

export { BookImage };
