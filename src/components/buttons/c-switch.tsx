import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { COLORS, FONT_STYLES } from '@themes';

interface CSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  title: string;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const CSwitch: FC<CSwitchProps> = ({
  value,
  onValueChange,
  title,
  labelStyle,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, labelStyle]}>{title}</Text>
      <Switch
        style={{
          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
          marginRight: -10,
        }}
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          true: COLORS.primaryBlack,
        }}
        disabled={disabled}
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
});

export { CSwitch };
