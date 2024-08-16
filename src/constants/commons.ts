import { DataModels } from '@models';
import { LIST_SORT_OPTION } from './mock';

const DEFAULT_SORT: DataModels.ISortOption = LIST_SORT_OPTION[0];

const SEARCH_VIEW_STYLE = {
  grid: 'grid',
  list: 'list',
  complex: 'complex',
};

const PRICE_STEP = 1000;

const DEFAULT_PRICE_RANGE: number[] = [0, 2000000];

const CREDIT_CARD_TYPE = {
  masterCard: 'master-card',
  jcb: 'jcb',
  visa: 'visa',
};

const PAYMENT_TYPE = {
  cod: 'cod',
  creditCard: 'credit_card',
  momo: 'momo',
  zalo_pay: 'zalo_pay',
};

const ADMINISTRATIVE = {
  city: 'City',
  district: 'District',
  ward: 'Ward',
};

export {
  ADMINISTRATIVE,
  CREDIT_CARD_TYPE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT,
  PAYMENT_TYPE,
  PRICE_STEP,
  SEARCH_VIEW_STYLE,
};
