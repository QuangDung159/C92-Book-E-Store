import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { authenticationStore } from '@store';
import { BookListing } from './components';

const BookListingScreen = ({ navigation, route }: any) => {
  const listBook = route.params?.listBook || [];
  const title = route.params?.title;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await authenticationStore.fetchUser();
  };

  return (
    <BookListing
      listBook={listBook || []}
      title={title}
      loadData={() => {
        loadData();
      }}
      navigation={navigation}
    />
  );
};

const observable = observer(BookListingScreen);
export { observable as BookListingScreen };
