import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
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
import { referenceOptionsStore, searchStore } from '@store';
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

  const { openSearchScreen } = useNavigate(navigation);

  const [isCollapseDescription, setIsCollapseDescription] = useState(true);
  const [isCollapseInformation, setIsCollapseInformation] = useState(true);
  const [isCollapseReview, setIsCollapseReview] = useState(true);

  const [isShowReviewPopup, setIsShowReviewPopup] = useState(false);
  const [searchFilter, setSearchFilter] = useState<DataModels.ISearchFilter>(
    {},
  );

  useEffect(() => {
    setIsCollapseDescription(true);
    setIsCollapseInformation(true);
    setIsCollapseReview(true);
    //
    scrollToTop();
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
        onSubmit={(data) => {
          console.log('data :>> ', data);
        }}
      />
      {book && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          scrollEnabled={true}
        >
          <BookImage book={book} data={data} navigation={navigation} />
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
            {`Stock: ${book.stock} pcs`}
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
              {Boolean(book.priceNotSale) && (
                <Text style={styles.priceNotSale}>
                  {StringHelpers.formatCurrency(book.priceNotSale)}
                </Text>
              )}
              <Text style={styles.price}>
                {StringHelpers.formatCurrency(book.price)}
              </Text>
            </View>
            <AddToCartButton
              itemCount={1}
              containerStyle={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}
              buttonType="icon"
              bookCardItem={book}
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
            <ReviewSection
              book={book}
              onPressLeaveReview={() => {
                setIsShowReviewPopup(true);
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
