import React, { FC } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

const TopToast: FC<any> = () => {
  return (
    <View
      style={{
        zIndex: 199,
      }}
    >
      <Toast visibilityTime={2000} topOffset={8} />
    </View>
  );
};

export { TopToast };
