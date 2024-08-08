import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class CategoryStore {
  categorySelected: DataModels.ICategory | null = null;

  constructor() {
    makeObservable(this, {
      categorySelected: observable,
      setCategorySelected: action,
    });
  }

  setCategorySelected(value: DataModels.ICategory) {
    this.categorySelected = value;
  }
}

export { CategoryStore };
