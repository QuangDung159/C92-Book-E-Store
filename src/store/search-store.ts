import { action, makeObservable, observable } from 'mobx';
import { DEFAULT_SORT } from '@constants';
import { DataModels } from '@models';
import { COLORS } from '@themes';

class SearchStore {
  sortOption: DataModels.ISortOption | null = DEFAULT_SORT;
  viewStyle: string = 'grid';

  constructor() {
    makeObservable(this, {
      sortOption: observable,
      viewStyle: observable,
      setSortOption: action,
      setViewStyle: action,
    });
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
}

export { SearchStore };
