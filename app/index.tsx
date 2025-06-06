import React, { useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { appModel } from '@store';
import { Navigation } from '../src/navigation';

export default function App() {
  useEffect(() => {
    appModel.appInit();
    appModel.loadMasterData();
  }, []);

  return (
    <>
      <View
        style={{
          zIndex: 199,
        }}
      >
        <Toast visibilityTime={2000} topOffset={0} />
      </View>
      <Navigation />
    </>
  );
}
