import { Image, ImageStyle } from 'expo-image';
import React, { useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { COLORS } from '@themes';

interface BookCardCarouselProps {
  carouselWidth: number;
  carouselHeight: number;
  data: any[];
  imageStyle: StyleProp<ImageStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

const BookCardCarousel: React.FC<BookCardCarouselProps> = ({
  carouselWidth,
  carouselHeight,
  data,
  imageStyle,
  dotStyle,
}) => {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Carousel
        vertical={false}
        width={carouselWidth}
        height={carouselHeight}
        ref={ref}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View
            style={[
              styles.imageWrapper,
              {
                width: carouselWidth,
                height: carouselHeight,
              },
            ]}
          >
            <Image
              style={imageStyle}
              source={item}
              contentFit="contain"
              transition={500}
            />
          </View>
        )}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ ...styles.dot, ...(dotStyle as object) }}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paging}
        onPress={onPressPagination}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageWrapper: {
    alignItems: 'center',
  },
  paging: { gap: 5 },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    width: 4,
    height: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primaryBlack,
    width: 4,
    height: 4,
  },
});

export { BookCardCarousel };
