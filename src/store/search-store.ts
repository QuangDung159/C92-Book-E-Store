import { action, makeObservable, observable } from 'mobx';
import { DEFAULT_SORT } from '@constants';
import { DataModels } from '@models';
import { COLORS } from '@themes';

class SearchStore {
  sortOption: DataModels.ISortOption | null = DEFAULT_SORT;
  viewStyle: string = 'grid';
  searchFilter: DataModels.ISearchFilter | null = null;
  searchFilterDefault: DataModels.ISearchFilter = {
    max: 659000,
    min: 90000,
  };

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      viewStyle: observable,
      searchFilter: observable,
      setSortOption: action,
      setViewStyle: action,
      setSearchFilter: action,
      resetSeachFilter: action,
    });

    this.searchFilter = this.searchFilterDefault;
  }

  setSortOption(value: DataModels.ISortOption) {
    this.sortOption = value;
  }

  setViewStyle(value: string) {
    this.viewStyle = value;
  }

  getViewStyleIconColor = (viewStyle: string) => {
    return this.viewStyle === viewStyle ? COLORS.primaryBlack : COLORS.gray;
  };

  setSearchFilter(value: DataModels.ISearchFilter) {
    this.searchFilter = value;
  }

  resetSeachFilter() {
    this.searchFilter = this.searchFilterDefault;
  }
}

export { SearchStore };
