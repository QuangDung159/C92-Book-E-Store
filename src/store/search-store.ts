import { action, computed, makeObservable, observable } from 'mobx';
import { DEFAULT_SORT } from '@constants';
import { DataModels } from '@models';
import { COLORS } from '@themes';

const defaultFilter: DataModels.ISearchFilter = {
  max: 659000,
  min: 90000,
  author: [],
  form: [],
  publisher: [],
};

class SearchStore {
  sortOption: DataModels.ISortOption | null = DEFAULT_SORT;
  viewStyle: string = 'grid';
  searchFilter: DataModels.ISearchFilter | null = defaultFilter;

  searchFilterPreviuos: DataModels.ISearchFilter = defaultFilter;

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      viewStyle: observable,
      searchFilter: observable,
      searchFilterPreviuos: observable,
      setSortOption: action,
      setViewStyle: action,
      setSearchFilter: action,
      resetSeachFilter: action,
      backToPreviousFilter: action,
      setSearchFilterPreviuos: action,
      filterSelectedRange: computed,
      listAuthorSelected: computed,
      listFormSelected: computed,
    });
  }

  setSearchFilterPreviuos(value: DataModels.ISearchFilter) {
    this.searchFilterPreviuos = value;
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
    this.searchFilter = { ...this.searchFilter, ...value };
  }

  resetSeachFilter() {
    this.searchFilter = defaultFilter;
  }

  backToPreviousFilter() {
    this.searchFilter = this.searchFilterPreviuos;
  }

  get filterSelectedRange() {
    return [this.searchFilter.min, this.searchFilter.max];
  }

  get listAuthorSelected() {
    return this.searchFilter.author || [];
  }

  get listFormSelected() {
    return this.searchFilter.form || [];
  }
}

export { SearchStore };
