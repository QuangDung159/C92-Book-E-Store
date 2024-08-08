import { action, makeObservable, observable } from 'mobx';
import { DEFAULT_SORT } from '@constants';
import { DataModels } from '@models';

class SearchStore {
  sortOption: DataModels.ISortOption | null = DEFAULT_SORT;

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      setSortOption: action,
    });
  }

  setSortOption(value: DataModels.ISortOption) {
    this.sortOption = value;
  }
}

export { SearchStore };
