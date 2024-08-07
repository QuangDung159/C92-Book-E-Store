import { AntDesign, Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { ImageAssets } from '@assets';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS } from '@themes';

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

  const renderCard = (item: DataModels.IBook, index: number) => {
    return (
      <React.Fragment key={item.id}>
        <View
          style={{
            marginRight: index !== TOP_BOOKS1.length - 1 ? 12 : 0,
            width: 180,
          }}
        >
          <View
            style={{
              height: 280,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.gray,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Image
              style={{
                width: '90%',
                flex: 1,
              }}
              source={ImageAssets.bookImage1}
              contentFit="contain"
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.primaryBlack,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              height: 140,
              padding: 12,
            }}
          >
            <Text
              style={{
                color: COLORS.primaryWhite,
                fontSize: 10,
              }}
            >
              {item.category}
            </Text>
            <Layouts.VSpace value={4} />
            <View
              style={{
                height: 60,
              }}
            >
              <Text
                style={{
                  color: COLORS.primaryWhite,
                  fontSize: 16,
                  fontWeight: 'semibold',
                }}
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Layouts.VSpace value={8} />
              <Text
                style={{
                  color: COLORS.primaryWhite,
                  fontSize: 10,
                }}
              >
                {item.author}
              </Text>
            </View>
            <Layouts.VSpace value={8} />
            <Text
              style={{
                color: COLORS.primaryWhite,
                fontSize: 22,
                fontWeight: 'bold',
              }}
            >
              ${item.price}
            </Text>
          </View>
        </View>
      </React.Fragment>
    );
  };

  const listCard = () => {
    return (
      <FlashList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={TOP_BOOKS1}
        renderItem={({ item, index }) => <>{renderCard(item, index)}</>}
      />
    );
  };

  const topBooksFilter = [
    {
      label: 'This Week',
      value: 'week',
    },
    {
      label: 'This Month',
      value: 'month',
    },
    {
      label: 'This Year',
      value: 'year',
    },
  ];

  const renderTopBooksFilter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {topBooksFilter.map((item) => {
          return (
            <React.Fragment key={item.value}>
              <View
                style={{
                  backgroundColor: COLORS.primaryBlack,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'semibold',
                    color: COLORS.primaryWhite,
                    padding: 8,
                  }}
                >
                  {item.label}
                </Text>
              </View>
              <Layouts.HSpace value={12} />
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const TOP_BOOKS1: Array<DataModels.IBook> = [
    {
      name: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      price: 25,
      isLiked: false,
      category: 'Classics',
      id: '1',
    },
    {
      name: 'Nine Liars',
      author: 'Oscar Wilde',
      price: 25.99,
      isLiked: true,
      category: 'Classics',
      id: '2',
    },
    {
      name: 'The Picture of Dorian Gray 12 1233 s qww eeww ww',
      author: 'Oscar Wilde 123',
      price: 25,
      isLiked: false,
      category: 'Classics',
      id: '3',
    },
    {
      name: 'The Picture of Dorian 44v',
      author: 'Oscar Wilde 44',
      price: 19,
      isLiked: false,
      category: 'Fantasy',
      id: '4',
    },
  ];

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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={styles.categoryTitle}>Top Books</Text>
          <Layouts.MaxSpace />
          <Text style={styles.seeMore}>See more</Text>
        </View>
        <Layouts.VSpace value={12} />
        {renderTopBooksFilter()}
        <Layouts.VSpace value={24} />
        {listCard()}
        <Layouts.VSpace value={12} />
        <Text style={styles.seeMore}>See more</Text>
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
