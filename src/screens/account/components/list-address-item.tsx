import React from 'react';
import { DataModels } from '@models';
import { AddressItem } from './address-item';

interface ListAddressItemProps {
  listAddress: DataModels.IShippingAddress[];
}

const ListAddressItem: React.FC<ListAddressItemProps> = ({ listAddress }) => {
  return (
    <>
      {listAddress.map((item) => {
        return <AddressItem key={item.id} addressItem={item} />;
      })}
    </>
  );
};

export { ListAddressItem };
