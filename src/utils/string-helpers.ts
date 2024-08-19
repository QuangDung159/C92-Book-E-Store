import { DataModels } from '@models';

export const searchByFirstLetter = (
  listItem: Array<DataModels.IReferenceOptions>,
  keyWord: string,
  isIgnoreValue?: boolean,
) => {
  const keyWordLowerKey = keyWord.toLowerCase();
  return listItem.filter((item) => {
    if (item.value && item.label) {
      const lettersInitial = item.label
        .match(/(\b\S)?/g)
        .join('')
        .toLowerCase();
      return (
        (!isIgnoreValue && item?.value.toLowerCase().match(keyWordLowerKey)) ||
        item?.label.toLowerCase().match(keyWordLowerKey) ||
        lettersInitial?.match(keyWordLowerKey)
      );
    }
    return false;
  });
};

export const getItemFromDataSource = (
  value: string,
  field: string,
  listRef: DataModels.IReferenceOptions[],
) => {
  const result = listRef.find((item) => item[field] === value);
  if (result) {
    return result;
  }
  return null;
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getFullAddress = (address: DataModels.IShippingAddress) => {
  return `${address.address}, ${address.ward}, ${address.district}, ${address.city}`;
};

export const getShortAddress = (address: DataModels.IShippingAddress) => {
  return `${address.ward}, ${address.district}, ${address.city}`;
};
