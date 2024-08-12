import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Layouts.MaxSpace />
      {isCollapse ? (
        <Icons.ChevronDownIcon size={20} onPress={() => setIsCollapse(false)} />
      ) : (
        <Icons.ChevronUpIcon size={20} disabled />
      )}
    </View>
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
