import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { ImageAssets } from '@assets';
import { Layouts } from '@components';
import { TOP_BOOKS, TOP_BOOKS_FILTER } from '@constants';
import { COLORS } from '@themes';
import { HorizontalListCard } from './components';

const HomeScreen = ({ navigation }: any) => {
  const width = Dimensions.get('window').width;

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const data = [...new Array(6).keys()];

  const carouselItemWidth = width * 0.85;

  const baseOptions = {
    vertical: false,
    width: carouselItemWidth,
    height: carouselItemWidth / 2,
  } as const;

  const [topBooksSelectedFilter, setTopBooksSelectedFilter] = useState(
    TOP_BOOKS_FILTER[0].value,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryWhite,
        paddingHorizontal: 24,
        paddingTop: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 12,
        }}
      >
        <TextInput
          placeholder="Happy reading!"
          style={{
            height: 40,
            flex: 1,
          }}
          mode="outlined"
          activeOutlineColor={COLORS.primaryBlack}
        />
        <Layouts.HSpace value={8} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Feather name="search" size={24} />
          <Layouts.HSpace value={8} />
          <View>
            <AntDesign name="shoppingcart" size={24} />
            <View
              style={{
                position: 'absolute',
                bottom: 15,
                left: 10,
                backgroundColor: COLORS.primaryBlack,
                borderRadius: 99,
                minHeight: 16,
                minWidth: 26,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.primaryWhite,
                  fontSize: 8,
                  paddingHorizontal: 2,
                  fontWeight: 'bold',
                }}
              >
                99+
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={12}></Layouts.VSpace>
        <Text style={styles.categoryTitle}>Best Deals</Text>
        <Layouts.VSpace value={12} />
        <View style={{ flex: 1 }}>
          <Carousel
            {...baseOptions}
            ref={ref}
            style={{ width: '100%' }}
            data={data}
            onProgressChange={progress}
            renderItem={() => (
              <View
                style={{
                  flex: 1,
                  marginRight: '2.5%',
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: '100%',
                  }}
                  source={ImageAssets.slide}
                  contentFit="contain"
                />
              </View>
            )}
          />
        </View>
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 50 }}
          activeDotStyle={{
            backgroundColor: COLORS.primaryBlack,
          }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
        <Layouts.VSpace value={24} />
        <HorizontalListCard
          listItem={TOP_BOOKS}
          title="Top Books"
          showSeeMore
          showTopFilter
          setTopBooksSelectedFilter={(value) =>
            setTopBooksSelectedFilter(value)
          }
          topBooksSelectedFilter={topBooksSelectedFilter}
        />
        <Layouts.VSpace value={48} />
        <HorizontalListCard
          listItem={TOP_BOOKS}
          title="Latest Books"
          showSeeMore
        />
        <Layouts.VSpace value={48} />
        <HorizontalListCard
          listItem={TOP_BOOKS}
          title="Upcoming Books"
          showSeeMore
        />
        <Layouts.VSpace value={24} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'semibold',
  },
  seeMore: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export { HomeScreen };
