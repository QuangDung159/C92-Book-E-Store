type AdministrativeUnitEnum = 'city' | 'district' | 'ward';

type ServiceResultHandler = {
  onSuccess?: () => void;
  onFail?: () => void;
  params?: any;
};

type PaymentData = {
  amount: number;
  extraData?: string;
  ipnUrl: string;
  orderId: string;
  orderInfo: string;
  redirectUrl: string;
  requestId: string;
  partnerName?: string;
  storeId?: string;
  lang?: string;
  autoCapture?: boolean;
};

type ZaloPayOrder = {
  appId: string;
  appUser: string;
  appTime: number;
  amount: number;
  appTransId: string;
  embedData: string;
  item: string;
  description: string;
};

type PaymentStatus = 'success' | 'fail' | 'waiting_for_pay';
type OrderStatus = 'completed' | 'canceled' | 'processing' | 'created';

type NotificationParam = {
  sound?: string;
  title?: string;
  expoPushToken?: string;
  body?: string;
  data?: any;
};

type GoogleUser = {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  scopes: string[];
  /**
   * JWT (JSON Web Token) that serves as a secure credential for your user's identity.
   */
  idToken: string | null;
  /**
   * Not null only if a valid webClientId and offlineAccess: true was
   * specified in configure().
   */
  serverAuthCode: string | null;
};

type PaymentType = 'cod' | 'credit_card' | 'momo' | 'zalo_pay';

type PaymentCardType = 'master-card' | 'jcb' | 'visa';

export {
  AdministrativeUnitEnum,
  PaymentCardType,
  GoogleUser,
  NotificationParam,
  OrderStatus,
  PaymentData,
  PaymentStatus,
  PaymentType,
  ServiceResultHandler,
  ZaloPayOrder,
};
