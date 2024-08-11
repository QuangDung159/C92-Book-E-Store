import { observer } from 'mobx-react-lite';
import React from 'react';
import { Buttons } from '@components';
import { DataModels } from '@models';

interface ListCheckBoxFilterProps {
  onCheck: (value: string, status: boolean) => void;
  listFilterItem: DataModels.IReferenceOptions[];
  listRefer: string[];
}

const ListCheckBoxFilter: React.FC<ListCheckBoxFilterProps> = ({
  onCheck,
  listFilterItem,
  listRefer,
}) => {
  const renderListAuthorCheckBox = () => {
    return (
      <>
        {listFilterItem.map((item) => {
          const checked = listRefer.includes(item.value);
          return (
            <React.Fragment key={item.value}>
              <Buttons.CCheckBox
                checked={checked ? 'checked' : 'unchecked'}
                label={item.label}
                onCheck={() => {
                  onCheck?.(item.value, checked);
                }}
              />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return <>{renderListAuthorCheckBox()}</>;
};

// const styles = StyleSheet.create({
//   filterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
// });

const observable = observer(ListCheckBoxFilter);
export { observable as ListCheckBoxFilter };
