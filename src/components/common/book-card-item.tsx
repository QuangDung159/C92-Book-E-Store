import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ImageAssets } from '@assets';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemProps {
  bookCardItem: DataModels.IBook;
  isLastItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  bookCardItem,
  isLastItem,
  containerStyle,
}) => {
  return (
    <React.Fragment key={bookCardItem.id}>
      <View
        style={[
          {
            marginRight: isLastItem ? 0 : 12,
            width: 180,
          },
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
          <View style={styles.inforSection}>
            <Text style={styles.title} numberOfLines={2}>
              {bookCardItem.name}
            </Text>
            <Layouts.VSpace value={8} />
            <Text style={styles.subTitle}>{bookCardItem.author}</Text>
          </View>
          <Layouts.VSpace value={8} />
          <Text style={styles.price}>${bookCardItem.price}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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
  },
  inforSection: {
    height: 60,
  },
  title: {
    color: COLORS.primaryWhite,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  price: {
    ...FONT_STYLES.BOLD_18,
    color: COLORS.primaryWhite,
  },
});

export { BookCardItem };
