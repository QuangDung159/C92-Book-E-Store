import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Buttons, Layouts } from '@components';
import { COLORS, FONT_STYLES } from '@themes';

interface BottomButtonSectionProps {
  onPress: () => void;
  disabled?: boolean;
  buttonTitle?: string;
  hasCancel?: boolean;
}

const BottomButtonSection: React.FC<BottomButtonSectionProps> = ({
  onPress,
  hasCancel,
  disabled,
  buttonTitle,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonWrapper}>
      <Layouts.VSpace value={10} />
      <View style={styles.totalWrapper}>
        {hasCancel && (
          <>
            <View
              style={{
                flex: 1,
              }}
            >
              <Buttons.CButton
                onPress={() => navigation.goBack()}
                label={'Cancel'}
              />
            </View>
            <Layouts.HSpace value={12} />
          </>
        )}
        <View
          style={{
            flex: 1,
          }}
        >
          <Buttons.CButton
            onPress={() => onPress?.()}
            label={buttonTitle || 'Checkout'}
            buttonType="primary"
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingHorizontal: 24,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    height: 64,
  },
  totalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    ...FONT_STYLES.BOLD_22,
  },
});

export { BottomButtonSection };
