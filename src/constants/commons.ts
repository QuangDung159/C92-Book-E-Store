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

const PAYMENT_CARD_TYPE = {
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
  province: 'Province',
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

const CODE_PUSH_NUMBER = '17257036111';

const PAYMENT_STATUS = {
  success: 'success',
  fail: 'fail',
  waitingForPay: 'waiting-for-pay',
};

const DEEP_LINK_URL = 'c92bookestorev1:///';
const DEEP_LINK_PAYMENT_SUCCESS_URL = `${DEEP_LINK_URL}payment-success?`;

const EXPO_PUSH_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

const IN_APP_MESSAGE_ACTION_ID = {
  openStore: 'OPEN_STORE',
  voucher: 'VOUCHER',
};

const LIST_HOME_PAGE_TITLE = {
  topBook: 'top',
  latest: 'latest',
  upcomming: 'upcomming',
};

const API_URL = {
  shippingAddress: process.env.EXPO_PUBLIC_BASE_URL + '/shipping-address',
  user: process.env.EXPO_PUBLIC_BASE_URL + '/user',
};

export {
  ADMINISTRATIVE,
  API_URL,
  CODE_PUSH_NUMBER,
  DEEP_LINK_PAYMENT_SUCCESS_URL,
  DEEP_LINK_URL,
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT,
  ERROR_CODES,
  EXPO_PUSH_NOTIFICATION_URL,
  IN_APP_MESSAGE_ACTION_ID,
  LIST_HOME_PAGE_TITLE,
  MOMO_REQUEST_TYPE,
  PAYMENT_CARD_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  PRICE_STEP,
  SEARCH_VIEW_STYLE,
};
