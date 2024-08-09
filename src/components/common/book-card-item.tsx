import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { ImageAssets } from '@assets';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardItemProps {
  bookCardItem: DataModels.IBook;
  containerStyle?: StyleProp<ViewStyle>;
  index: number;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  bookCardItem,
  containerStyle,
  index,
}) => {
  return (
    <React.Fragment key={bookCardItem.id}>
      <View
        style={[
          styles.conatiner,
          index % 2 === 0
            ? {
                marginRight: 6,
              }
            : {
                marginLeft: 6,
              },
          containerStyle,
        ]}
      >
        <View style={styles.imageWrapper}>
          <View
            style={{
              position: 'absolute',
              right: 4,
              top: 8,
            }}
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color={COLORS.primaryBlack}
            />
            <Ionicons name="eye" size={20} />
          </View>
          <Image
            style={styles.image}
            source={ImageAssets.bookImage1}
            contentFit="contain"
            transition={500}
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
          <Layouts.VSpace value={8} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Layouts.MaxSpace />
            <View style={styles.cartIconWrapper}>
              <AntDesign
                name="shoppingcart"
                size={24}
                color={COLORS.primaryBlack}
              />
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    borderRadius: 8,
    flex: 1,
    marginBottom: 12,
  },
  imageWrapper: {
    height: 340,
    alignItems: 'center',
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
  },
  image: {
    width: 100,
    flex: 1,
    marginTop: -160,
  },
  info: {
    backgroundColor: COLORS.primaryBlack,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 180,
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
  cartIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryWhite,
  },
});

export { BookCardItem };
