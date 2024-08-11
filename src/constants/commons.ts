import { DataModels } from '@models';

const DEFAULT_SORT: DataModels.ISortOption = {
  value: 'name_asc',
  label: 'Name ASC',
};

const SEARCH_VIEW_STYLE = {
  grid: 'grid',
  list: 'list',
  complex: 'complex',
};

const PRICE_STEP = 1000;

export { DEFAULT_SORT, PRICE_STEP, SEARCH_VIEW_STYLE };
