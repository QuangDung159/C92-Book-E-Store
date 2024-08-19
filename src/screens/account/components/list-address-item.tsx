import React from 'react';
import { EmptyListComponent } from '@components';
import { DataModels } from '@models';
import { AddressItem } from './address-item';

interface ListAddressItemProps {
  listAddress: DataModels.IShippingAddress[];
  onSubmitShippingAddress?: (
    shippingAddress: DataModels.IShippingAddress,
    isAddNew?: boolean,
  ) => void;
}

const ListAddressItem: React.FC<ListAddressItemProps> = ({
  listAddress,
  onSubmitShippingAddress,
}) => {
  return (
    <>
      {listAddress && listAddress.length > 0 ? (
        <>
          {listAddress.map((item) => {
            return (
              <AddressItem
                key={item.id}
                addressItem={item}
                onSubmitShippingAddress={onSubmitShippingAddress}
              />
            );
          })}
        </>
      ) : (
        <EmptyListComponent content="List empty" />
      )}
    </>
  );
};

export { ListAddressItem };
