import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { userStore } from '@store';
import { BookListing } from './components';

const FavoriteScreen = ({ navigation }: any) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await userStore.fetchAllListInAccount();
  };

  return (
    <BookListing
      listBook={userStore.listFavorite || []}
      title="Favourites"
      loadData={() => {
        loadData();
      }}
      navigation={navigation}
    />
  );
};

const observable = observer(FavoriteScreen);
export { observable as FavoriteScreen };
