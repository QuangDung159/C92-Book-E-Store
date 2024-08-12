import { DataModels } from '@models';
import { LIST_SORT_OPTION } from './mock';

const DEFAULT_SORT: DataModels.ISortOption = LIST_SORT_OPTION[0];

const SEARCH_VIEW_STYLE = {
  grid: 'grid',
  list: 'list',
  complex: 'complex',
};

const PRICE_STEP = 1000;

export { DEFAULT_SORT, PRICE_STEP, SEARCH_VIEW_STYLE };
