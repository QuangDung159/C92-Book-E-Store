import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { ImageAssets } from '@assets';
import { Layouts } from '@components';
import { TOP_BOOKS, TOP_BOOKS_FILTER } from '@constants';
import { COLORS } from '@themes';
import { BestDealCarousel, HorizontalListCard } from './components';

const HomeScreen = ({ navigation }: any) => {
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
        <BestDealCarousel
          data={[
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
            ImageAssets.slide,
          ]}
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
