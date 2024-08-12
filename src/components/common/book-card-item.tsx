import { Image } from 'expo-image';
import React, { useRef } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { ImageAssets } from '@assets';
import { BookCardPrice, Buttons, Icons, Layouts } from '@components';
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
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { width } = Dimensions.get('window');

  const carouselWidth = (width - 48 - 12) / 2;
  const carouselHeight = carouselWidth * 1.2;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

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
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              right: 8,
              zIndex: 99,
              top: 8,
            }}
          >
            {bookCardItem.isLiked ? (
              <Icons.HeartIcon size={20} />
            ) : (
              <Icons.HeartOutlineIcon size={20} />
            )}
          </View>
          <Carousel
            vertical={false}
            width={carouselWidth}
            height={carouselHeight}
            ref={ref}
            data={data}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <View
                style={{
                  width: carouselWidth,
                  height: carouselHeight,
                  alignItems: 'center',
                }}
              >
                <Image
                  style={styles.image}
                  source={item}
                  contentFit="contain"
                  transition={500}
                />
              </View>
            )}
          />
        </View>
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.paging}
          onPress={onPressPagination}
        />
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
  imageWrapper: {
    height: 200,
    alignItems: 'center',
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
  cartIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
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
  iconsWrapper: {
    position: 'absolute',
    right: 6,
    top: 10,
  },
  paging: { gap: 5, marginTop: 10 },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    width: 4,
    height: 4,
    marginTop: -36,
  },
  activeDot: {
    backgroundColor: COLORS.primaryBlack,
    width: 4,
    height: 4,
  },
});

export { BookCardItem };
