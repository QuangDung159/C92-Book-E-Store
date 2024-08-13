import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { ProgressBar } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ImageAssets } from '@assets';
import {
  AddToCartButton,
  BookCardCarousel,
  Buttons,
  Icons,
  Layouts,
  ListBookCardHorizontal,
} from '@components';
import { CATEGORY, TOP_BOOKS } from '@constants';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { referenceOptionsStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { delay, StringHelpers } from '@utils';
import { InformationTitle, InfoRow, ReviewPopup } from './components';

const BookDetailScreen = ({ route, navigation }: any) => {
  const book = route.params?.book as DataModels.IBook;

  const { openSearchScreen } = useNavigate(navigation);

  const { width } = Dimensions.get('window');

  const carouselWidth = width - 48;
  const carouselHeight = carouselWidth * 0.6;

  const ratingBarWidth = width - 48 - 100 - 24 - 80 - 5;

  const [isCollapseDescription, setIsCollapseDescription] = useState(true);
  const [isCollapseInformation, setIsCollapseInformation] = useState(true);
  const [isCollapseReview, setIsCollapseReview] = useState(true);

  const [isShowReviewPopup, setIsShowReviewPopup] = useState(false);
  const [listReview, setListReview] = useState<DataModels.IReview[]>([]);
  const [searchFilter, setSearchFilter] = useState<DataModels.ISearchFilter>(
    {},
  );

  useEffect(() => {
    setListReview(book?.reviews || []);
  }, [book?.reviews]);

  useEffect(() => {
    setIsCollapseDescription(true);
    setIsCollapseInformation(true);
    setIsCollapseReview(true);
    //
    delay(500).then(() => {
      setIsCollapseDescription(false);
    });
  }, [book]);

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
      <TouchableOpacity
        onPress={() => {
          const listByStar = book.reviews?.filter(
            (item) => item.rating === +title,
          );
          //
          setListReview(listByStar);
        }}
      >
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
            color={COLORS.error50}
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
      </TouchableOpacity>
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

    const reviewCount = book.reviews.length;

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
        percent: count1 / reviewCount,
      },
      {
        count: count2,
        percent: count2 / reviewCount,
      },
      {
        count: count3,
        percent: count3 / reviewCount,
      },
      {
        count: count4,
        percent: count4 / reviewCount,
      },
      {
        count: count5,
        percent: count5 / reviewCount,
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
                flexShrink: 2,
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.BOLD_14,
                }}
                numberOfLines={2}
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
            <Layouts.MaxSpace />
            <StarRatingDisplay
              rating={review.rating}
              starSize={16}
              starStyle={{
                marginLeft: -6,
              }}
              color={COLORS.error50}
            />
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
      <ReviewPopup
        visible={isShowReviewPopup}
        onDismiss={() => {
          setIsShowReviewPopup(false);
        }}
        onSubmit={(data) => {
          console.log('data :>> ', data);
        }}
      />
      {book && (
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
            <StarRatingDisplay
              rating={book.rating}
              starSize={24}
              color={COLORS.error50}
              starStyle={{
                marginLeft: -2,
              }}
            />
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
                  ...FONT_STYLES.SEMIBOLD_14,
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
              {book.description || 'N/a'}
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
            <InfoRow
              title="Category"
              value={book.category.name}
              hasCheckBox
              onCheck={(value) => {
                const item = CATEGORY.find((item) => item.name === value);
                setSearchFilter({
                  ...searchFilter,
                  category: item?.id || '',
                });
              }}
            />
            <InfoRow
              title="Form"
              value={book.form.name}
              hasCheckBox
              onCheck={(value) => {
                const item = StringHelpers.getItemFromDataSource(
                  value,
                  'label',
                  referenceOptionsStore.formDataSource,
                );
                setSearchFilter({
                  ...searchFilter,
                  form: item ? [item.value] : [],
                });
              }}
            />
            <InfoRow
              title="Size"
              value={`${book.width} x ${book.height} x ${book.thick} cm`}
            />
            <Layouts.VSpace value={12} />
            <InfoRow title="Page count" value={book.pageCount.toString()} />
            <Layouts.VSpace value={12} />
            <InfoRow
              title="Author"
              value={book.author.name}
              hasCheckBox
              onCheck={(value) => {
                const item = StringHelpers.getItemFromDataSource(
                  value,
                  'label',
                  referenceOptionsStore.authorDataSource,
                );
                setSearchFilter({
                  ...searchFilter,
                  author: item ? [item.value] : [],
                });
              }}
            />
            <InfoRow
              title="Publisher"
              value={book.publisher.name}
              hasCheckBox
              onCheck={(value) => {
                const item = StringHelpers.getItemFromDataSource(
                  value,
                  'label',
                  referenceOptionsStore.publisherDataSource,
                );
                setSearchFilter({
                  ...searchFilter,
                  publisher: item ? [item.value] : [],
                });
              }}
            />
            <Layouts.VSpace value={8} />
            <Buttons.CButton
              label="Find similar"
              onPress={() => {
                openSearchScreen({ searchFilter });
              }}
              disabled={
                !(
                  searchFilter.author?.length ||
                  searchFilter.category ||
                  searchFilter.publisher?.length ||
                  searchFilter.form?.length
                )
              }
            />
            <Layouts.VSpace value={24} />
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
            title={`${(book.reviews || []).length} Review(s)`}
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
                      {book.rating}
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
                    color={COLORS.error50}
                  />
                </View>
                <Layouts.VSpace value={8} />
                <TouchableOpacity
                  onPress={() => {
                    setListReview(book.reviews || []);
                  }}
                >
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
                      {`${(book.reviews || []).length} review(s)`}
                    </Text>
                  </View>
                </TouchableOpacity>
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
            {(listReview || []).map((item) => {
              return (
                <React.Fragment key={item.id}>
                  {renderComment(item)}
                </React.Fragment>
              );
            })}
            <Buttons.CButton
              label="Leave your review"
              buttonType="primary"
              onPress={() => {
                setIsShowReviewPopup(true);
              }}
            />
          </Collapsible>
          <Layouts.VSpace value={24} />
          <Text style={{ ...FONT_STYLES.BOLD_18 }}>Recommand</Text>
          <Layouts.VSpace value={12} />
          <ListBookCardHorizontal listItem={TOP_BOOKS} />
          <Layouts.VSpace value={24} />
        </ScrollView>
      )}
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
