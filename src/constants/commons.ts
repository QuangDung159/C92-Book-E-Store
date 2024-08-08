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

export { DEFAULT_SORT, SEARCH_VIEW_STYLE };
