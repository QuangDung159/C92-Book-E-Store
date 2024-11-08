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
  showFullName?: boolean;
}

const BookTitle: React.FC<BookTitleProps> = ({
  book,
  navigation,
  style,
  showFullName,
}) => {
  const { openBookDetailScreen } = useNavigate(navigation);

  return (
    <TouchableOpacity
      onPress={() => {
        openBookDetailScreen(book);
      }}
    >
      <Text style={[styles.title, style]} numberOfLines={showFullName ? 3 : 2}>
        {book.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.BOLD_14,
  },
});

export { BookTitle };
