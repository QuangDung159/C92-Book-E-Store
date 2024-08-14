import Toast from 'react-native-toast-message';

export const showToast = (
  message: string,
  type: 'error' | 'success' | 'info' = 'success',
) => {
  Toast.show({
    type: type,
    text1: message,
  });
};
