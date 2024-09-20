import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { FONT_STYLES } from '@themes';

interface InformationTitleProps {
  title: string;
  isCollapse: boolean;
  setIsCollapse: (isCollapse: boolean) => void;
}

const InformationTitle: React.FC<InformationTitleProps> = ({
  title,
  isCollapse,
  setIsCollapse,
}) => {
  const onPress = () => {
    if (!isCollapse) {
      return;
    }

    setIsCollapse(!isCollapse);
  };

  return (
    <TouchableOpacity activeOpacity={isCollapse ? 0.6 : 1} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Layouts.MaxSpace />
        {isCollapse ? (
          <Icons.ChevronDownIcon size={20} onPress={onPress} />
        ) : (
          <Icons.ChevronUpIcon size={20} disabled onPress={onPress} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...FONT_STYLES.BOLD_16,
  },
});

export { InformationTitle };
