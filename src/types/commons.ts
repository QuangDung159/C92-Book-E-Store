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

export { AdministrativeUnitEnum, PaymentData, ServiceResultHandler };
