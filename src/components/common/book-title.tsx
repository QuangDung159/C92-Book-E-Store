import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';

interface BookTitleProps {
  book: DataModels.IBook;
  navigation: any;
}

const BookTitle: React.FC<BookTitleProps> = ({ book, navigation }) => {
  const { openBookDetailScreen } = useNavigate(navigation);

  return (
    <TouchableOpacity
      onPress={() => {
        openBookDetailScreen(book);
      }}
    >
      <Text style={styles.title} numberOfLines={2}>
        {book.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
});

export { BookTitle };
