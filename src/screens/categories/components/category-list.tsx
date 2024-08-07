import React from 'react';
import { DataModels } from '@models';
import { CategoryItem } from './categoryItem';

interface CategoryListProps {
  list: DataModels.ICategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ list }) => {
  return (
    <>
      {list.map((item) => {
        return <CategoryItem key={item.id} item={item} />;
      })}
    </>
  );
};

export { CategoryList };
