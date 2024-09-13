import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BookCardCarousel, BookHeartIcon, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { BookServices } from '@services';

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
      <View style={styles.heartIconWrapper}>
        <BookHeartIcon containerStyle={{}} bookCardItem={book} />
        <Layouts.VSpace value={8} />
        <Icons.ShareIcon
          size={16}
          onPress={() => {
            BookServices.onShare(book.id);
          }}
        />
      </View>
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
