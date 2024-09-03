import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT_STYLES } from '@themes';

interface EndOfListListComponentProps {
  content?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const EndOfListListComponent: React.FC<EndOfListListComponentProps> = ({
  content = 'End of list',
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, textStyle]}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    alignItems: 'center',
    marginTop: 14,
  },
  label: {
    ...FONT_STYLES.SEMIBOLD_14,
    color: COLORS.gray70,
  },
});

export { EndOfListListComponent };
