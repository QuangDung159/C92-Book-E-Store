import { action, computed, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { CategoryServices } from '@services';

class CategoryStore {
  categorySelected: DataModels.ICategory | null = null;
  listCategory: DataModels.ICategory[] = [];

  constructor() {
    makeObservable(this, {
      categorySelected: observable,
      listCategory: observable,
      setListCategory: action,
      setCategorySelected: action,
      selectedChild: computed,
    });
  }

  setCategorySelected(value?: DataModels.ICategory) {
    this.categorySelected = value;
  }

  setListCategory(values: DataModels.ICategory[]) {
    this.listCategory = values;
  }

  get selectedChild() {
    if (!this.categorySelected) {
      return this.listCategory.filter((item) => !item.parent);
    } else {
      const listSelectedChild = this.listCategory.filter(
        (item) => item.parent === this.categorySelected.id,
      );

      return listSelectedChild;
    }
  }

  async fetchListCategory() {
    const result = await CategoryServices.fetchListCategory();

    if (result.success && result.data?.list) {
      const list: DataModels.ICategory[] = (result.data?.list || []).map(
        (item: any) => {
          return {
            hasChild: item.hasChild,
            id: item._id,
            name: item.name,
            parent: item.parent,
          } as DataModels.ICategory;
        },
      );

      this.setListCategory(list);
    }
  }
}

export { CategoryStore };
