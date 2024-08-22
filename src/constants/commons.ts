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

const enum ERROR_CODES {
  NO_ERROR = 0,
  UNKNOWN_ERROR = -1,
  BUSINESS_ERROR = 422,
  TOO_MANY_REQUEST_ERROR = 429,
  INVALID_TOKEN = 406,
  INVALID_AUTHORIZATION = 403,
  NETWORK_ERROR = 500,
  MAINTENANCE_ERROR = 503,
}

const MOMO_REQUEST_TYPE = 'captureWallet';

const CODE_PUSH_NUMBER = '1724338181';

export {
  ADMINISTRATIVE,
  CODE_PUSH_NUMBER,
  CREDIT_CARD_TYPE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT,
  ERROR_CODES,
  MOMO_REQUEST_TYPE,
  PAYMENT_TYPE,
  PRICE_STEP,
  SEARCH_VIEW_STYLE,
};
