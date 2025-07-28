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
  NOT_FOUND_ERROR = 404,
  BAD_REQUEST = 400,
}

const MOMO_REQUEST_TYPE = 'captureWallet';

const CODE_PUSH_NUMBER = '1753412948';

const PAYMENT_STATUS = {
  success: 'success',
  fail: 'fail',
  waitingForPay: 'waiting-for-pay',
};

const SHCEME = 'app/BookEStoreV1/';

const DEEP_LINK_URL = `c92bookestorev1:///${SHCEME}`;

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const APP_LINK_URL = `${BASE_URL}${SHCEME}`;

const DEEP_LINK_PAYMENT_SUCCESS_URL = `${DEEP_LINK_URL}payment-success-screen?`;

const EXPO_PUSH_NOTIFICATION_URL = 'https://exp.host/--/api/v2/push/send';

const GOOGLE_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.dragonc92team.BookEStoreV1';

const APP_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.dragonc92team.BookEStoreV1';

const SUPPORT_LINK = 'https://sites.google.com/view/c92-book-e-store/home';

const API_PREFIX = 'api/v1/book-store';

const IN_APP_MESSAGE_ACTION_ID = {
  openStore: 'OPEN_STORE',
  voucher: 'VOUCHER',
};

const LIST_HOME_PAGE_TITLE = {
  topBook: 'top',
  latest: 'latest',
  upcoming: 'upcoming',
};

const API_BASE_URL = BASE_URL + API_PREFIX;

const API_URL = {
  shippingAddress: API_BASE_URL + '/shipping-address',
  user: API_BASE_URL + '/user',
  notification: API_BASE_URL + '/notification',
  config: API_BASE_URL + '/config',
  creditCard: API_BASE_URL + '/credit-card',
  book: API_BASE_URL + '/book',
  cart: API_BASE_URL + '/cart',
  cartItem: API_BASE_URL + '/cart-item',
  category: API_BASE_URL + '/category',
  order: API_BASE_URL + '/order',
  author: API_BASE_URL + '/author',
  publisher: API_BASE_URL + '/publisher',
  form: API_BASE_URL + '/form',
  review: API_BASE_URL + '/review',
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
  { id: '1', value: 'cod', label: 'Cash on Delivery', showIcon: false },
  // { id: '2', value: 'momo', label: 'Momo', showIcon: false },
  // { id: '3', value: 'zalo_pay', label: 'Zalo Pay', showIcon: false },
  { id: '4', value: 'credit_card', label: 'Credit Card', showIcon: true },
];

const LIST_PAYMENT_METHOD_IOS = [
  { id: '1', value: 'cod', label: 'Cash on Delivery', showIcon: false },
];

const PACKAGE_NAME = 'com.dragonc92team.BookEStoreV1';

const UNKNOWN_ERROR_MESSAGE = 'An unknown error occurred.';

const APP_ID = '6748847426';

export {
  ADMINISTRATIVE,
  API_PREFIX,
  API_URL,
  APP_ID,
  APP_LINK_URL,
  APP_STORE_URL,
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
  LIST_PAYMENT_METHOD_IOS,
  LIST_SORT_OPTION,
  MOMO_REQUEST_TYPE,
  PACKAGE_NAME,
  PAYMENT_CARD_TYPE,
  PAYMENT_STATUS,
  PAYMENT_TYPE,
  PRICE_STEP,
  SEARCH_VIEW_STYLE,
  SHCEME,
  SUPPORT_LINK,
  TOP_BOOKS_FILTER,
  UNKNOWN_ERROR_MESSAGE,
};
