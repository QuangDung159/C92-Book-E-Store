import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ImageAssets } from '@assets';
import { BookCardCarousel, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { InformationTitle, InfoRow } from './components';

const BookDetailScreen = ({ route, navigation }: any) => {
  const book = route.params?.book as DataModels.IBook;

  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  const [isCollapseDescription, setIsCollapseDescription] = useState(false);
  const [isCollapseInformation, setIsCollapseInformation] = useState(true);
  const [isCollapseReview, setIsCollapseReview] = useState(true);

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
            dotStyle={{
              marginTop: 12,
            }}
          />
        </View>
        <Layouts.VSpace value={12} />
        <Text
          style={{
            ...FONT_STYLES.BOLD_18,
          }}
        >
          {book.name}
        </Text>
        <Layouts.VSpace value={12} />
        <Text
          style={{
            ...FONT_STYLES.REGULAR_14,
          }}
        >
          Rating: 4.9
        </Text>
        <Layouts.VSpace value={12} />
        <Text
          style={{
            ...FONT_STYLES.REGULAR_14,
          }}
        >
          Stock: 12 pcs
        </Text>
        <Layouts.VSpace value={12} />
        <InformationTitle
          isCollapse={isCollapseDescription}
          setIsCollapse={(isCollapse) => {
            if (!isCollapse) {
              setIsCollapseDescription(isCollapse);
              setIsCollapseInformation(!isCollapse);
              setIsCollapseReview(!isCollapse);
            }
          }}
          title="Description"
        />
        <Layouts.VSpace value={12} />
        <Collapsible collapsed={isCollapseDescription}>
          <Text
            style={{
              ...FONT_STYLES.REGULAR_14,
              lineHeight: 20,
            }}
          >
            {book.description}
          </Text>
        </Collapsible>
        <Layouts.VSpace value={12} />
        <InformationTitle
          isCollapse={isCollapseInformation}
          setIsCollapse={(isCollapse) => {
            console.log('isCollapse :>> ', isCollapse);
            if (!isCollapse) {
              setIsCollapseInformation(isCollapse);
              setIsCollapseDescription(!isCollapse);
              setIsCollapseReview(!isCollapse);
            }
          }}
          title="Information"
        />
        <Layouts.VSpace value={12} />
        <Collapsible collapsed={isCollapseInformation}>
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
        </Collapsible>
        <Layouts.VSpace value={12} />
        <InformationTitle
          isCollapse={isCollapseReview}
          setIsCollapse={(isCollapse) => {
            console.log('isCollapse :>> ', isCollapse);
            if (!isCollapse) {
              setIsCollapseReview(isCollapse);
              setIsCollapseDescription(!isCollapse);
              setIsCollapseInformation(!isCollapse);
            }
          }}
          title="Reviews"
        />
        <Layouts.VSpace value={12} />
        <Collapsible collapsed={isCollapseReview}>
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
          <InfoRow title="Form" value="Form 1" />
        </Collapsible>
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
