import { Image, ImageSource } from 'expo-image';
import React, { useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { Layouts } from '@components';
import { COLORS } from '@themes';

interface BestDealCarouselProps {
  data: ImageSource[];
}

const BestDealCarousel: React.FC<BestDealCarouselProps> = ({ data }) => {
  const width = Dimensions.get('window').width;

  // const data = [...new Array(6).keys()];

  const carouselItemWidth = width * 0.85;

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const baseOptions = {
    vertical: false,
    width: carouselItemWidth,
    height: carouselItemWidth / 2,
  } as const;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <>
      <Text style={styles.categoryTitle}>Best Deals</Text>
      <Layouts.VSpace value={12} />
      <View style={styles.container}>
        <Carousel
          {...baseOptions}
          ref={ref}
          style={styles.carousel}
          data={data}
          onProgressChange={progress}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={item} contentFit="contain" />
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
    </>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'semibold',
  },
  container: { flex: 1 },
  imageWrapper: {
    flex: 1,
    marginRight: '2.5%',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  paging: { gap: 5, marginTop: 10 },
  dot: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 },
  activeDot: {
    backgroundColor: COLORS.primaryBlack,
  },
  carousel: { width: '100%' },
});

export { BestDealCarousel };
