import React, { useEffect } from 'react';
import { LIST_AUTHOR } from '@constants';
import { referenceOptionsStore } from '@store';
import Navigation from '../src/navigation';

export default function App() {
  useEffect(() => {
    referenceOptionsStore.setAuthorDataSource(LIST_AUTHOR);
  }, []);

  return <Navigation />;
}
