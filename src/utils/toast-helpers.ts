import Toast from 'react-native-toast-message';
import { COLORS, FONT_STYLES } from '@themes';

type toastProps = {
  title: string;
  content?: string;
  type?: 'error' | 'success' | 'info';
  onPress?: () => void;
};

export const showToast = ({
  title,
  type = 'success',
  onPress,
  content,
}: toastProps) => {
  Toast.show({
    type: type,
    text1: title,
    text2: content,
    onPress: () => {
      onPress?.();
      Toast.hide();
    },
    text1Style: {
      ...FONT_STYLES.SEMIBOLD_14,
      color: COLORS.primaryBlack,
    },
    text2Style: {
      ...FONT_STYLES.REGULAR_14,
      color: COLORS.primaryBlack,
    },
  });
};
