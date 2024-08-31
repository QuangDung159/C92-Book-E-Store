import React, { FC } from 'react';
import { Dimensions, View } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';
import { COLORS, FONT_STYLES } from '@themes';

const TopToast: FC<any> = () => {
  const { width } = Dimensions.get('window');

  const toastConfig: ToastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', width: width - 12 }}
        text1Style={{
          ...FONT_STYLES.BOLD_16,
        }}
        text2Style={{
          ...FONT_STYLES.REGULAR_16,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: COLORS.error50, width: width - 12 }}
        text1Style={{
          ...FONT_STYLES.BOLD_16,
        }}
        text2Style={{
          ...FONT_STYLES.REGULAR_16,
        }}
      />
    ),
  };

  return (
    <View
      style={{
        zIndex: 199,
      }}
    >
      <Toast config={toastConfig} visibilityTime={2000} topOffset={8} />
    </View>
  );
};

export { TopToast };
