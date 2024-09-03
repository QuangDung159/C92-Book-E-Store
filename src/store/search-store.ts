import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { DEFAULT_SORT } from '@constants';
import { DataModels } from '@models';
import { BookServices } from '@services';
import { sharedStore } from '@store';
import { COLORS } from '@themes';
import { delay } from '@utils';
import { IBook } from 'models/data-models';

const defaultFilter: DataModels.ISearchFilter = {
  max: 659000,
  min: 10000,
  author: [],
  form: [],
  publisher: [],
};

class SearchStore {
  sortOption: DataModels.ISortOption | null = DEFAULT_SORT;
  viewStyle: string = 'grid';
  searchFilter: DataModels.ISearchFilter | null = defaultFilter;

  searchFilterPreviuos: DataModels.ISearchFilter = defaultFilter;

  listBook: IBook[] = [];

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      viewStyle: observable,
      searchFilter: observable,
      searchFilterPreviuos: observable,
      listBook: observable,
      setListBook: action,
      setSortOption: action,
      setViewStyle: action,
      setSearchFilter: action,
      resetSeachFilter: action,
      backToPreviousFilter: action,
      setSearchFilterPreviuos: action,
      submitSearch: action,
      filterSelectedRange: computed,
      listAuthorSelected: computed,
      listFormSelected: computed,
      listPublisherSelected: computed,
    });
  }

  setListBook(values: DataModels.IBook[]) {
    this.listBook = values;
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

  get listPublisherSelected() {
    return this.searchFilter.publisher || [];
  }

  async submitSearch(page?: number) {
    sharedStore.setShowLoading(true);
    await delay(500);

    const result = await BookServices.queryBook(
      this.searchFilter,
      this.sortOption,
      page,
    );

    if (result && result.success) {
      if (page !== 1) {
        this.setListBook(this.listBook.concat(result.data.list));
      } else {
        this.setListBook(result.data.list);
      }
    }

    sharedStore.setShowLoading(false);
  }

  updateBookItem = (bookItem: IBook) => {
    const listBook = [...this.listBook];
    const index = listBook.findIndex((item) => item.id === bookItem.id);

    if (index === -1) {
      return;
    }

    listBook.splice(index, 1, bookItem);

    runInAction(() => {
      this.listBook = listBook;
    });
  };
}

export { SearchStore };
