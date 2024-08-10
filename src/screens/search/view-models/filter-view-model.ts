import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class FilterViewModel {
  searchFilter: DataModels.ISearchFilter | null = null;
  priceSelectedRange: number[] = [0, 0];
  visible: boolean = false;

  constructor(searchFilter: DataModels.ISearchFilter) {
    makeObservable(this, {
      searchFilter: observable,
      priceSelectedRange: observable,
      visible: observable,
      setSearchFilter: action,
      setPriceSelectedPrice: action,
      setVisible: action,
    });

    if (searchFilter) {
      this.searchFilter = searchFilter;
      this.priceSelectedRange = [searchFilter.min, searchFilter.max];
    }
  }

  setPriceSelectedPrice(values: number[]) {
    this.priceSelectedRange = values;
  }

  setSearchFilter(value: DataModels.ISearchFilter) {
    this.searchFilter = value;
  }

  setVisible(value: boolean) {
    this.visible = value;
  }
}

export { FilterViewModel };
