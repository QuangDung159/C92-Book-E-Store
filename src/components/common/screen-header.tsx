import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

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
  const { width } = Dimensions.get('window');
  const goBack = () => {
    onGoBack?.();
    navigation.goBack();
  };

  const renderLeftComponent = () => {
    if (!leftComponent) {
      return <Icons.ChevronLeftIcon onPress={goBack} />;
    } else {
      return leftComponent();
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          width,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.left}>{renderLeftComponent()}</View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.right}>{rightConponent?.()}</View>
      </View>
      <Layouts.VSpace value={12} />
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
    marginTop: 18,
    paddingHorizontal: 24,
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
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
});

export { ScreenHeader };
