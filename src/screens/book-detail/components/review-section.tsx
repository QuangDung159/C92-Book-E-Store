import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Buttons, Icons, Layouts } from '@components';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { userStore } from '@store';
import { COLORS, FONT_STYLES } from '@themes';

interface ReviewSectionProps {
  book: DataModels.IBook;
  onPressLeaveReview: () => void;
  onPressColapse?: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  book,
  onPressLeaveReview,
  onPressColapse,
}) => {
  const { width } = Dimensions.get('window');

  const ratingBarWidth = width - 48 - 100 - 24 - 80 - 5;

  const [listReview, setListReview] = useState<DataModels.IReview[]>([]);

  const navigation = useNavigation();

  const { openSignInScreen } = useNavigate(navigation);

  useEffect(() => {
    setListReview(book?.reviews || []);
  }, [book?.reviews]);

  const renderComment = (review: DataModels.IReview) => {
    return (
      <View>
        <View style={styles.listCommentContainer}>
          <View style={styles.commentHeader}>
            {review.avartarUrl ? (
              <></>
            ) : (
              <View style={styles.commentUserNameWrapper}>
                <Text style={styles.commentUserName}>
                  {review.name.charAt(0)}
                </Text>
              </View>
            )}
            <Layouts.HSpace value={12} />
            <View style={styles.commnetUserNameTextWrapper}>
              <Text style={styles.commentUserFullName} numberOfLines={2}>
                {review.name}
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

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{book.rating || 0}</Text>
          </View>
          <View style={styles.ratingStar}>
            <StarRatingDisplay
              rating={book.rating}
              starSize={20}
              starStyle={styles.starStyle}
              color={COLORS.error50}
            />
          </View>
          <Layouts.VSpace value={8} />
          <TouchableOpacity
            onPress={() => {
              setListReview(book.reviews || []);
            }}
          >
            <Text style={styles.reviewText}>
              {`${(book.reviews || []).length} review(s)`}
            </Text>
          </TouchableOpacity>
        </View>
        <Layouts.HSpace value={24} />
        <View style={styles.ratingBarContainer}>
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
      {listReview?.length > 0 && (
        <>
          {listReview.map((item) => {
            return (
              <React.Fragment key={item.id}>
                {renderComment(item)}
              </React.Fragment>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              onPressColapse?.();
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...FONT_STYLES.SEMIBOLD_12,
                }}
              >
                Collapse
              </Text>
              <Icons.ChevronUpIcon size={20} />
            </View>
          </TouchableOpacity>
          <Layouts.VSpace value={16} />
        </>
      )}
      <Buttons.CButton
        label={userStore.userProfile ? 'Leave your review' : 'Please sign in'}
        buttonType="primary"
        onPress={() => {
          if (userStore.userProfile) {
            onPressLeaveReview();
          } else {
            openSignInScreen();
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  ratingContainer: {
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
    width: 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    ...FONT_STYLES.BOLD_22,
  },
  ratingStar: {
    marginLeft: -3,
    marginTop: 8,
  },
  starStyle: {
    marginRight: -6,
  },
  reviewText: {
    ...FONT_STYLES.BOLD_14,
    textAlign: 'center',
  },
  ratingBarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listCommentContainer: {
    borderTopWidth: 1,
    paddingTop: 24,
    borderTopColor: COLORS.gray200,
  },
  commentHeader: {
    flexDirection: 'row',
  },
  commentUserNameWrapper: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  commentUserName: {
    ...FONT_STYLES.BOLD_22,
    color: COLORS.primaryWhite,
  },
  commnetUserNameTextWrapper: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexShrink: 2,
  },
  commentUserFullName: {
    ...FONT_STYLES.BOLD_14,
  },
});

export { ReviewSection };
