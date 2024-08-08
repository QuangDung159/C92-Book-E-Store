import React from 'react';
import { DataModels } from '@models';
import { CategoryItem } from './categoryItem';

interface CategoryListProps {
  list: DataModels.ICategory[];
  onPress: (categorySelected: DataModels.ICategory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ list, onPress }) => {
  return (
    <>
      {list.map((item) => {
        return <CategoryItem key={item.id} item={item} onPress={onPress} />;
      })}
    </>
  );
};

export { CategoryList };
