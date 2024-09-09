import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BookCardCarousel, BookHeartIcon, Icons } from '@components';
import { DataModels } from '@models';

interface BookImageProps {
  navigation: any;
  data: any[];
  book: DataModels.IBook;
}

const BookImage: React.FC<BookImageProps> = ({ navigation, data, book }) => {
  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.65;

  return (
    <View style={styles.imageWrapper}>
      <BookHeartIcon
        containerStyle={styles.heartIconWrapper}
        bookCardItem={book}
      />
      <View style={styles.backIcon}>
        <Icons.ChevronLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
          size={20}
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
