export const getItemById = (listItem: Array<any>, id: string) => {
  return getItemByField(listItem, id, 'id');
};

export const getItemByField = (
  listItem: Array<any>,
  value: any,
  field: string,
) => {
  const index = listItem.findIndex((item) => item[field] === value);

  if (index !== -1) {
    return {
      data: listItem[index],
      index,
    };
  }

  return null;
};

export const updateItemById = (listItem: Array<any>, itemUpdated: any) => {
  const index = listItem.findIndex((item) => item.id === itemUpdated.id);
  if (index === -1) {
    return listItem;
  }

  return listItem.splice(index, 1, itemUpdated);
};
