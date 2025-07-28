import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Layouts } from '@components';
import { DataModels } from '@models';
import { COLORS, FONT_STYLES } from '@themes';

interface BookCardInfoProps {
  book: DataModels.IBook;
}

const BookCardInfo: React.FC<BookCardInfoProps> = ({ book }) => {
  return (
    <React.Fragment key={book.id}>
      <Text style={styles.author}>{book.author.name}</Text>
      <Layouts.VSpace value={4} />
      <Text style={styles.stock}>{book.category.name}</Text>
      <Layouts.VSpace value={4} />
      <StarRatingDisplay
        rating={book.rating}
        starSize={16}
        color={COLORS.error50}
        starStyle={{
          marginLeft: -2,
        }}
      />
      <Layouts.VSpace value={4} />
      <Text
        style={styles.stock}
      >{`Stock: ${book.stock > 99 ? '99+' : book.stock}`}</Text>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  stock: {
    ...FONT_STYLES.REGULAR_12,
  },
  author: {
    ...FONT_STYLES.SEMIBOLD_12,
  },
});

export { BookCardInfo };
