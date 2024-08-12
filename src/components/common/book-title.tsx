import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { useNavigate } from '@hooks';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';

interface BookTitleProps {
  book: DataModels.IBook;
  navigation: any;
  style?: StyleProp<TextStyle>;
}

const BookTitle: React.FC<BookTitleProps> = ({ book, navigation, style }) => {
  const { openBookDetailScreen } = useNavigate(navigation);

  return (
    <TouchableOpacity
      onPress={() => {
        openBookDetailScreen(book);
      }}
    >
      <Text style={[styles.title, style]} numberOfLines={2}>
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
