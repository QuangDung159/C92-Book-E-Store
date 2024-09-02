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
import { COLORS } from '@themes';
import { IBook } from 'models/data-models';

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

  async submitSearch() {
    // delay(1000).then(() => {
    //   runInAction(() => {
    //     if (this.searchFilter.author && this.searchFilter.author.length > 0) {
    //       listResult = listResult.filter((item) =>
    //         this.searchFilter.author.includes(item.author.id),
    //       );
    //     }

    //     if (this.searchFilter.form && this.searchFilter.form.length > 0) {
    //       listResult = listResult.filter((item) =>
    //         this.searchFilter.form.includes(item.form.id),
    //       );
    //     }

    //     if (
    //       this.searchFilter.publisher &&
    //       this.searchFilter.publisher.length > 0
    //     ) {
    //       listResult = listResult.filter((item) =>
    //         this.searchFilter.publisher.includes(item.publisher.id),
    //       );
    //     }

    //     this.listBook = listResult;
    //   });
    // });

    const result = await BookServices.queryBook(
      this.searchFilter,
      this.sortOption,
    );

    if (result && result.success) {
      this.setListBook(result.data.list);
    }
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
