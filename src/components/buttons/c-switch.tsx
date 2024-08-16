import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { COLORS, FONT_STYLES } from '@themes';

interface CSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  title: string;
  labelStyle?: StyleProp<TextStyle>;
}

const CSwitch: FC<CSwitchProps> = ({
  value,
  onValueChange,
  title,
  labelStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, labelStyle]}>{title}</Text>
      <Switch
        style={styles.switchButton}
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          true: COLORS.primaryBlack,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...FONT_STYLES.REGULAR_14,
  },
  switchButton: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    marginRight: -10,
  },
});

export { CSwitch };
