import { DataModels } from '@models';

const LIST_SORT_OPTION: DataModels.ISortOption[] = [
  {
    value: 'name_asc',
    label: 'Name ASC',
    field: 'name',
  },
  {
    value: 'name_desc',
    label: 'Name DESC',
    field: 'name',
  },
  {
    value: 'price_asc',
    label: 'Price ASC',
    field: 'price',
  },
  {
    value: 'price_desc',
    label: 'Price DESC',
    field: 'price',
  },
];

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

const CODE_PUSH_NUMBER = '1726155893';

const PAYMENT_STATUS = {
  success: 'success',
  fail: 'fail',
  waitingForPay: 'waiting-for-pay',
};

const SHCEME = 'app/BookEStoreV1/';
const DEEP_LINK_URL = `c92bookestorev1://${SHCEME}`;
const APP_LINK_URL = `${process.env.EXPO_PUBLIC_APP_LINK_SERVER}${SHCEME}`;
// const APP_LINK_URL = 'https://thelqd.online/app/BookEStoreV1';
const DEEP_LINK_PAYMENT_SUCCESS_URL = `${DEEP_LINK_URL}payment-success-screen?`;

const EXPO_PUSH_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

const GOOGLE_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.dragonc92team.BookEStoreV1';

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
  notification: process.env.EXPO_PUBLIC_BASE_URL + '/notification',
  config: process.env.EXPO_PUBLIC_BASE_URL + '/config',
};

const LIST_ADMINITRATIVE_UNIT = [
  {
    value: 'province',
    label: ADMINISTRATIVE?.province,
  },
  {
    value: 'district',
    label: ADMINISTRATIVE?.district,
  },
  {
    value: 'ward',
    label: ADMINISTRATIVE?.ward,
  },
];

const TOP_BOOKS_FILTER = [
  {
    label: 'This Week',
    value: 'week',
  },
  {
    label: 'This Month',
    value: 'month',
  },
  {
    label: 'This Year',
    value: 'year',
  },
];

const LIST_PAYMENT_METHOD = [
  { id: '1', value: 'cod', label: 'Cash on Delivery' },
  { id: '2', value: 'momo', label: 'Momo' },
  { id: '3', value: 'zalo_pay', label: 'Zalo Pay' },
  { id: '4', value: 'credit_card', label: 'Credit Card' },
];

export {
  ADMINISTRATIVE,
  API_URL,
  APP_LINK_URL,
  CODE_PUSH_NUMBER,
  DEEP_LINK_PAYMENT_SUCCESS_URL,
  DEEP_LINK_URL,
  DEFAULT_PRICE_RANGE,
  DEFAULT_SORT,
  ERROR_CODES,
  EXPO_PUSH_NOTIFICATION_URL,
  GOOGLE_PLAY_STORE_URL,
  IN_APP_MESSAGE_ACTION_ID,
  LIST_ADMINITRATIVE_UNIT,
  LIST_HOME_PAGE_TITLE,
  LIST_PAYMENT_METHOD,
  LIST_SORT_OPTION,
  MOMO_REQUEST_TYPE,
  PAYMENT_CARD_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  PRICE_STEP,
  SEARCH_VIEW_STYLE,
  SHCEME,
  TOP_BOOKS_FILTER,
};
