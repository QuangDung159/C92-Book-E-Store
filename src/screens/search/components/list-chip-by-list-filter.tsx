import { observer } from 'mobx-react-lite';
import React from 'react';
import { Chip } from '@components';
import { DataModels } from '@models';

interface ListChipByListFilterProps {
  listItemId: string[];
  dataSource: DataModels.IReferenceOptions[];
  isHaveLastItem?: boolean;
}

const ListChipByListFilter: React.FC<ListChipByListFilterProps> = ({
  listItemId,
  dataSource,
  isHaveLastItem,
}) => {
  return (
    <>
      {listItemId.map((itemId, index) => {
        const filterChip = dataSource.find((item) => item.value === itemId);

        return (
          <Chip
            key={filterChip.value}
            label={filterChip.label}
            onRemove={() => {}}
            value={filterChip.value}
            showRemove
            isLastItem={isHaveLastItem && index === listItemId.length - 1}
          />
        );
      })}
    </>
  );
};

const observable = observer(ListChipByListFilter);
export { observable as ListChipByListFilter };
