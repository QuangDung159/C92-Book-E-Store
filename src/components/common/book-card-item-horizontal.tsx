import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ImageAssets } from '@assets';
import { BookCardPrice, BookTitle, Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemHorizontalProps {
  bookCardItem: DataModels.IBook;
  isLastItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardItemHorizontal: React.FC<BookCardItemHorizontalProps> = ({
  bookCardItem,
  isLastItem,
  containerStyle,
}) => {
  const navigation = useNavigation();
  return (
    <React.Fragment key={bookCardItem.id}>
      <View
        style={[
          styles.container,
          { marginRight: isLastItem ? 0 : 12 },
          containerStyle,
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={ImageAssets.bookImage1}
            contentFit="contain"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.subTitle}>{bookCardItem.category}</Text>
          <Layouts.VSpace value={4} />
          <View
            style={{
              height: 60,
            }}
          >
            <BookTitle
              style={styles.title}
              navigation={navigation}
              book={bookCardItem}
            />
            <Layouts.VSpace value={8} />
            <Text style={styles.subTitle}>{bookCardItem.author}</Text>
          </View>
          <Layouts.VSpace value={8} />
          <BookCardPrice price={bookCardItem.price} style={styles.price} />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  price: {
    color: COLORS.primaryWhite,
  },
  container: {
    width: 180,
  },
  imageWrapper: {
    height: 300,
    alignItems: 'center',
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
  image: {
    width: '60%',
    flex: 1,
    marginTop: -120,
  },
  info: {
    backgroundColor: COLORS.primaryBlack,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 140,
    padding: 12,
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
  },
  subTitle: {
    ...FONT_STYLES.REGULAR_10,
    color: COLORS.primaryWhite,
    lineHeight: 10,
  },
  title: {
    color: COLORS.primaryWhite,
  },
});

export { BookCardItemHorizontal };
