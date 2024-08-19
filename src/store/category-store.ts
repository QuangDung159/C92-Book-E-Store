import { action, computed, makeObservable, observable } from 'mobx';
import { CATEGORY } from '@constants';
import { DataModels } from '@models';

class CategoryStore {
  categorySelected: DataModels.ICategory | null = null;

  constructor() {
    makeObservable(this, {
      categorySelected: observable,
      setCategorySelected: action,
      selectedChild: computed,
    });
  }

  setCategorySelected(value?: DataModels.ICategory) {
    this.categorySelected = value;
  }

  get selectedChild() {
    if (!this.categorySelected) {
      return CATEGORY.filter((item) => !item.parent);
    } else {
      const listSelectedChild = CATEGORY.filter(
        (item) => item.parent === this.categorySelected.id,
      );

      return listSelectedChild;
    }
  }
}

export { CategoryStore };
