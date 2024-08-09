import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { BookCardItem, Layouts } from '@components';
import { DataModels } from '@models';

interface BookCardRowItemProps {
  bookCardRowItemLeft: DataModels.IBook;
  bookCardRowItemRight: DataModels.IBook;
  isLastItem?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookCardRowItem: React.FC<BookCardRowItemProps> = ({
  bookCardRowItemLeft,
  bookCardRowItemRight,
  containerStyle,
}) => {
  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48 - 24) / 2;

  return (
    <React.Fragment key={bookCardRowItemLeft.id}>
      <View style={[styles.container, containerStyle]}>
        <BookCardItem
          containerStyle={{
            width: cardWidth,
          }}
          bookCardItem={bookCardRowItemLeft}
        />
        <Layouts.HSpace value={12} />
        <BookCardItem
          containerStyle={{
            width: cardWidth,
          }}
          bookCardItem={bookCardRowItemRight}
        />
      </View>
      <Layouts.VSpace value={12} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
});

export { BookCardRowItem };
