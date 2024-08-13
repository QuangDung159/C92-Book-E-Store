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

export const getLabel = (
  value: string,
  listRef: DataModels.IReferenceOptions[],
) => {
  const result = listRef.find((item) => item.value === value);
  if (result) {
    return result.label;
  }
  return null;
};

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
