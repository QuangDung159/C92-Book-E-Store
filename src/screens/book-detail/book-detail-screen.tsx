import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MD3Colors, ProgressBar } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ImageAssets } from '@assets';
import { AddToCartButton, BookCardCarousel, Icons, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';
import { InformationTitle, InfoRow } from './components';

const BookDetailScreen = ({ route, navigation }: any) => {
  const book = route.params?.book as DataModels.IBook;

  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  const ratingBarWidth = width - 48 - 100 - 24 - 80 - 5;

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

  const renderRatingBar = (
    title: string,
    value: number,
    ratingCount: number,
  ) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_14,
            }}
          >
            {title} starts
          </Text>
          <ProgressBar
            style={{
              width: ratingBarWidth,
              borderRadius: 10,
              height: 8,
            }}
            progress={value}
            color={MD3Colors.error50}
          />
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_14,
            }}
          >
            {ratingCount}
          </Text>
        </View>
        <Layouts.VSpace value={8} />
      </>
    );
  };

  const countNumberReview = () => {
    if (!book.reviews || book.reviews.length === 0) {
      return [
        {
          count: 0,
          percent: 0,
        },
        {
          count: 0,
          percent: 0,
        },
        {
          count: 0,
          percent: 0,
        },
        {
          count: 0,
          percent: 0,
        },
        {
          count: 0,
          percent: 0,
        },
      ];
    }

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    book.reviews.forEach((item) => {
      switch (item.rating) {
        case 1:
          count1 += 1;
          break;
        case 2:
          count2 += 1;
          break;
        case 3:
          count3 += 1;
          break;
        case 4:
          count4 += 1;
          break;
        default:
        case 5:
          count5 += 1;
          break;
      }
    });

    return [
      {
        count: count1,
        percent: count1 !== 0 ? 1 / count1 : 0,
      },
      {
        count: count2,
        percent: count2 !== 0 ? 1 / count2 : 0,
      },
      {
        count: count3,
        percent: count3 !== 0 ? 1 / count3 : 0,
      },
      {
        count: count4,
        percent: count4 !== 0 ? 1 / count4 : 0,
      },
      {
        count: count5,
        percent: count5 !== 0 ? 1 / count5 : 0,
      },
    ];
  };

  const renderComment = (review: DataModels.IReview) => {
    return (
      <View>
        <View
          style={{
            borderTopWidth: 1,
            paddingTop: 24,
            borderTopColor: COLORS.gray200,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: COLORS.gray,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.BOLD_22,
                  color: COLORS.primaryWhite,
                }}
              >
                {review.userName[0]}
              </Text>
            </View>
            <Layouts.HSpace value={12} />
            <View
              style={{
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.BOLD_14,
                }}
              >
                {review.userName}
              </Text>
              <Text
                style={{
                  ...FONT_STYLES.REGULAR_10,
                }}
              >
                {review.createdAt}
              </Text>
            </View>
          </View>
          <Layouts.VSpace value={12} />
          <Text
            style={{
              ...FONT_STYLES.REGULAR_14,
            }}
          >
            {review.content}
          </Text>
        </View>
        <Layouts.VSpace value={24} />
      </View>
    );
  };

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
            ...FONT_STYLES.BOLD_22,
          }}
        >
          {book.name}
        </Text>
        <Layouts.VSpace value={12} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* <StarRating starSize={24} rating={rating} onChange={setRating} /> */}
          <StarRatingDisplay rating={book.rating} starSize={24} />
          <Layouts.MaxSpace />
          <TouchableOpacity
            onPress={() => {
              setIsCollapseReview(false);
              setIsCollapseDescription(true);
              setIsCollapseInformation(true);
            }}
          >
            <Text
              style={{
                ...FONT_STYLES.REGULAR_14,
              }}
            >
              {book.reviews?.length} review(s)
            </Text>
          </TouchableOpacity>
        </View>
        <Layouts.VSpace value={12} />
        <Text
          style={{
            ...FONT_STYLES.REGULAR_14,
          }}
        >
          Stock: 12 pcs
        </Text>
        <Layouts.VSpace value={24} />
        <AddToCartButton
          itemCount={1}
          containerStyle={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}
          buttonType="text-icon"
        />
        <Layouts.VSpace value={24} />
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
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View>
              <View
                style={{
                  width: 100,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.gray200,
                    borderRadius: 8,
                    width: 100,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      ...FONT_STYLES.BOLD_22,
                    }}
                  >
                    4.55
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginLeft: -3,
                  marginTop: 8,
                }}
              >
                <StarRatingDisplay
                  rating={book.rating}
                  starSize={20}
                  starStyle={{
                    marginRight: -6,
                  }}
                />
              </View>
              <Layouts.VSpace value={8} />
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    ...FONT_STYLES.BOLD_14,
                  }}
                >
                  {book.reviews?.length} review(s)
                </Text>
              </View>
            </View>
            <Layouts.HSpace value={24} />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
              }}
            >
              {renderRatingBar(
                '5',
                countNumberReview()[4].percent,
                countNumberReview()[4].count,
              )}
              {renderRatingBar(
                '4',
                countNumberReview()[3].percent,
                countNumberReview()[3].count,
              )}
              {renderRatingBar(
                '3',
                countNumberReview()[2].percent,
                countNumberReview()[2].count,
              )}
              {renderRatingBar(
                '2',
                countNumberReview()[1].percent,
                countNumberReview()[1].count,
              )}
              {renderRatingBar(
                '1',
                countNumberReview()[0].percent,
                countNumberReview()[0].count,
              )}
            </View>
          </View>
          <Layouts.VSpace value={24} />
          {book.reviews?.map((item) => {
            return (
              <React.Fragment key={item.id}>
                {renderComment(item)}
              </React.Fragment>
            );
          })}
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
