import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { FONT_STYLES } from '@themes';

interface CSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  title: string;
}

const CSwitch: FC<CSwitchProps> = ({ value, onValueChange, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        style={styles.switchButton}
        value={value}
        onValueChange={onValueChange}
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
    ...FONT_STYLES.SEMIBOLD_16,
  },
  switchButton: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    marginRight: -10,
  },
});

export { CSwitch };
