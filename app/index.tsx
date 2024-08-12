import React, { useEffect } from 'react';
import { LIST_AUTHOR, LIST_FORM, LIST_PUBLISHER } from '@constants';
import { referenceOptionsStore } from '@store';
import Navigation from '../src/navigation';

export default function App() {
  useEffect(() => {
    referenceOptionsStore.setAuthorDataSource(LIST_AUTHOR);
    referenceOptionsStore.setFormDataSource(LIST_FORM);
    referenceOptionsStore.setPublisherDataSource(LIST_PUBLISHER);
  }, []);

  return <Navigation />;
}
