import React, { useEffect } from 'react';
import { appModel } from '@store';
import Navigation from '../src/navigation';

export default function App() {
  useEffect(() => {
    appModel.appInit();
    appModel.loadMasterData();
  }, []);

  return <Navigation />;
}
