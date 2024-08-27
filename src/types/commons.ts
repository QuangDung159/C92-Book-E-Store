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

type NotificationParam = {
  sound?: string;
  title?: string;
  expoPushToken: string;
  body?: string;
  data?: any;
};

export {
  AdministrativeUnitEnum,
  PaymentData,
  PaymentStatus,
  ServiceResultHandler,
  ZaloPayOrder,
  NotificationParam,
};
