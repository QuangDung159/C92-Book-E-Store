import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

import { DEFAULT_SORT, LIST_HOME_PAGE_TITLE } from '@constants';
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
  listTopBook: IBook[] = [];
  listUpcomming: IBook[] = [];
  listLatest: IBook[] = [];

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      viewStyle: observable,
      searchFilter: observable,
      searchFilterPreviuos: observable,
      listBook: observable,
      listTopBook: observable,
      listUpcomming: observable,
      listLatest: observable,
      setListLatest: action,
      setListUpcomming: action,
      setListTopBook: action,
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

  setListLatest(values: DataModels.IBook[]) {
    this.listLatest = values;
  }

  setListUpcomming(values: DataModels.IBook[]) {
    this.listUpcomming = values;
  }

  setListTopBook(values: DataModels.IBook[]) {
    this.listTopBook = values;
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

  async submitSearch(showLoading?: boolean, page?: number) {
    if (showLoading) {
      sharedStore.setShowLoading(true);
    }

    await delay(500);

    const result = await BookServices.queryBook(
      this.searchFilter,
      this.sortOption,
      page,
    );

    if (result && result.success) {
      const list = result.data?.list || [];
      if (page !== 1) {
        this.setListBook(this.listBook.concat(list));
      } else {
        this.setListBook(list || []);
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

  async fetchListBookHomePage(title: string) {
    const result = await BookServices.fetchListHomePage(title);
    if (result && result.success) {
      const list = result.data?.list || [];
      if (title === LIST_HOME_PAGE_TITLE.latest) {
        this.setListLatest(list);
      }

      if (title === LIST_HOME_PAGE_TITLE.upcomming) {
        this.setListUpcomming(list);
      }

      if (title === LIST_HOME_PAGE_TITLE.topBook) {
        this.setListTopBook(list);
      }
    }
  }
}

export { SearchStore };
