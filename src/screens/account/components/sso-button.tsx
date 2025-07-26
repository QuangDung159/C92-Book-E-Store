/* eslint-disable import/no-named-as-default */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface SSOButtonProps {
  signInType: 'google' | 'facebook';
  onPress: () => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ signInType, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {signInType === 'google' ? (
          <Icons.GoogleIcon size={12} />
        ) : (
          <Icons.FacebookIcon size={12} />
        )}
      </TouchableOpacity>

      <Layouts.HSpace value={4} />
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 200,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.primaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    ...FONT_STYLES.SEMIBOLD_14,
  },
});

export { SSOButton };
