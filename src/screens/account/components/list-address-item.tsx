import React from 'react';
import { EmptyListComponent } from '@components';
import { DataModels } from '@models';
import { AddressItem } from './address-item';

interface ListAddressItemProps {
  listAddress: DataModels.IShippingAddress[];
}

const ListAddressItem: React.FC<ListAddressItemProps> = ({ listAddress }) => {
  return (
    <>
      {listAddress && listAddress.length > 0 ? (
        <>
          {listAddress.map((item) => {
            return <AddressItem key={item.id} addressItem={item} />;
          })}
        </>
      ) : (
        <EmptyListComponent content="List empty" />
      )}
    </>
  );
};

export { ListAddressItem };
