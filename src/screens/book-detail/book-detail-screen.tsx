/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from 'mobx-react-lite';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ImageAssets } from '@assets';
import { AddToCartButton, Buttons, Layouts } from '@components';
import { CATEGORY } from '@constants';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { BookServices } from '@services';
import {
  referenceOptionsStore,
  searchStore,
  sharedStore,
  userStore,
} from '@store';
import { COLORS, FONT_STYLES } from '@themes';
import { delay, StringHelpers } from '@utils';
import { HorizontalListCard } from 'screens/home/components';
import {
  BookImage,
  InformationTitle,
  InfoRow,
  ReviewPopup,
  ReviewSection,
} from './components';

const BookDetailScreen = ({ route, navigation }: any) => {
  const book = route.params?.book as DataModels.IBook;
  const bookIdParam = route.params?.bookId as string;

  const { openSearchScreen, openHomeScreen } = useNavigate(navigation);

  const [isCollapseDescription, setIsCollapseDescription] = useState(true);
  const [isCollapseInformation, setIsCollapseInformation] = useState(true);
  const [isCollapseReview, setIsCollapseReview] = useState(true);

  const [isShowReviewPopup, setIsShowReviewPopup] = useState(false);
  const [searchFilter, setSearchFilter] = useState<DataModels.ISearchFilter>(
    {},
  );
  const [bookInfo, setBookInfo] = useState<DataModels.IBook>();
  const [itemCount, setItemCount] = useState(1);
  const bookId = useMemo(
    () => book?.id || bookIdParam,
    [bookIdParam, book?.id],
  );

  const loadDetail = useCallback(async () => {
    sharedStore.setShowLoading(true);
    if (book) {
      setBookInfo(book);
    }

    if (bookId) {
      const result = await BookServices.fetchBookDetail(bookId);

      if (result?.data?.book) {
        const bookData = result.data.book as DataModels.IBook;

        let rating = 0;
        bookData.reviews.forEach((item) => {
          rating += item.rating;
        });

        const bookDetail: DataModels.IBook = {
          ...bookData,
          reviews: bookData.reviews.map(
            (item: any) =>
              ({
                ...item,
                username: item.user?.username,
              }) as DataModels.IReview,
          ),
          rating: +(rating / bookData.reviews.length).toFixed(1),
        };
        setBookInfo(bookDetail);
      }
    }
    sharedStore.setShowLoading(false);
  }, [book, bookIdParam]);

  useEffect(() => {
    submitViewed();
    setIsCollapseDescription(true);
    setIsCollapseInformation(true);
    setIsCollapseReview(true);
    //
    scrollToTop();
    //
    delay(500).then(() => {
      setIsCollapseDescription(false);
    });

    if (book || bookIdParam) {
      loadDetail();
    }
  }, [book, loadDetail, bookIdParam]);

  const submitViewed = async () => {
    if (!userStore.authenticated) return;

    const listBookViewed = [...userStore.userProfile.listBookViewed];
    const index = listBookViewed.findIndex((item) => item === bookId);

    if (index === -1) {
      listBookViewed.unshift(bookId);
    }

    userStore.updateUser({
      ...userStore.userProfile,
      listBookViewed,
    });

    userStore.fetchListInAccountView('viewed');
  };

  const data = [
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
    ImageAssets.bookImage1,
  ];

  const scrollRef = useRef<ScrollView>();

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ReviewPopup
        visible={isShowReviewPopup}
        onDismiss={() => {
          setIsShowReviewPopup(false);
        }}
        bookId={bookInfo?.id}
        onSubmitSuccess={() => {
          loadDetail();
        }}
      />
      {bookInfo ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          scrollEnabled={true}
        >
          <BookImage book={bookInfo} data={data} navigation={navigation} />
          <Layouts.VSpace value={12} />
          <Text
            style={{
              ...FONT_STYLES.BOLD_22,
            }}
          >
            {bookInfo.name}
          </Text>
          <Layouts.VSpace value={12} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <StarRatingDisplay
              rating={bookInfo.rating}
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
                {bookInfo.reviews?.length} review(s)
              </Text>
            </TouchableOpacity>
          </View>
          <Layouts.VSpace value={12} />
          <Text
            style={{
              ...FONT_STYLES.REGULAR_14,
            }}
          >
            {`Stock: ${bookInfo.stock} pcs`}
          </Text>
          <Layouts.VSpace value={12} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              {Boolean(bookInfo.priceNotSale) && (
                <Text style={styles.priceNotSale}>
                  {StringHelpers.formatCurrency(bookInfo.priceNotSale)}
                </Text>
              )}
              <Text style={styles.price}>
                {StringHelpers.formatCurrency(bookInfo.price)}
              </Text>
            </View>
            <AddToCartButton
              itemCount={itemCount}
              onUpdateCount={(count) => {
                setItemCount(count);
              }}
              containerStyle={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}
              buttonType="icon"
              bookCardItem={bookInfo}
            />
          </View>
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
              {bookInfo.description || 'N/a'}
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
              value={bookInfo.category.name}
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
              value={bookInfo.form.name}
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
              value={`${bookInfo.width} x ${bookInfo.height} x ${bookInfo.thick} cm`}
            />
            <Layouts.VSpace value={12} />
            <InfoRow title="Page count" value={bookInfo.pageCount.toString()} />
            <Layouts.VSpace value={12} />
            <InfoRow
              title="Author"
              value={bookInfo.author.name}
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
              value={bookInfo.publisher.name}
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
            title={`${(bookInfo.reviews || []).length} Review(s)`}
          />
          <Layouts.VSpace value={12} />
          <Collapsible collapsed={isCollapseReview}>
            <ReviewSection
              book={bookInfo}
              onPressLeaveReview={() => {
                setIsShowReviewPopup(true);
              }}
              onPressColapse={() => {
                setIsCollapseDescription(false);
                setIsCollapseInformation(true);
                setIsCollapseReview(true);
              }}
            />
          </Collapsible>
          <Layouts.VSpace value={24} />
          <HorizontalListCard
            listItem={searchStore.listTopBook}
            title="Maybe you will like"
            showSeeMore={false}
          />
          <Layouts.VSpace value={24} />
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...FONT_STYLES.SEMIBOLD_16,
            }}
          >
            Book not found!
          </Text>
          <Layouts.VSpace value={12} />
          <Buttons.CButton
            label="Go back"
            onPress={() => {
              openHomeScreen();
            }}
          />
        </View>
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
  priceNotSale: {
    ...FONT_STYLES.REGULAR_16,
    textDecorationLine: 'line-through',
    textAlign: 'right',
    color: COLORS.gray60,
  },
  price: {
    ...FONT_STYLES.BOLD_20,
  },
});

const observable = observer(BookDetailScreen);
export { observable as BookDetailScreen };
