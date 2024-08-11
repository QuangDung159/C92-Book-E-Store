import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONT_STYLES } from '@themes';
import { ChevronLeft } from './chevron-left';

interface ScreenHeaderProps {
  title?: string;
  leftComponent?: () => React.ReactNode;
  rightConponent?: () => React.ReactNode;
  navigation: any;
  onGoBack?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  leftComponent,
  rightConponent,
  navigation,
  onGoBack,
}) => {
  const goBack = () => {
    onGoBack?.();
    navigation.goBack();
  };

  const renderLeftComponent = () => {
    if (!leftComponent) {
      return (
        <TouchableOpacity onPress={goBack}>
          <ChevronLeft />
        </TouchableOpacity>
      );
    } else {
      return leftComponent();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>{renderLeftComponent()}</View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>{rightConponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...FONT_STYLES.BOLD_18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  left: {
    flex: 1,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export { ScreenHeader };
