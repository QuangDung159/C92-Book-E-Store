import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Icons } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface EmptyListComponentProps {
  content?: string;
  button?: () => React.ReactNode;
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({
  content = 'Empty',
  button,
}) => {
  const { height } = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.7,
      }}
    >
      <Icons.CloseBoxOutlineIcon color={COLORS.gray70} size={100} />
      {content && <Text style={styles.label}>{content}</Text>}
      {button?.()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    ...FONT_STYLES.SEMIBOLD_14,
    color: COLORS.gray70,
  },
});

export { EmptyListComponent };
