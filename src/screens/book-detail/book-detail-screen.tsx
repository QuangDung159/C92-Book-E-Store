import { observer } from 'mobx-react-lite';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { ImageAssets } from '@assets';
import { BookCardCarousel, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS } from '@themes';

const BookDetailScreen = ({ route, navigation }: any) => {
  const book = route.params?.book as DataModels.IBook;

  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  const data = [
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
  ];

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
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
          />
        </View>
        <Layouts.VSpace value={24} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  imageWrapper: {
    alignItems: 'center',
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

const observable = observer(BookDetailScreen);
export { observable as BookDetailScreen };
