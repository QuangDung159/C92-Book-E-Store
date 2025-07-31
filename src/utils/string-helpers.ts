import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { DataModels } from '@models';
import { PaymentData, ZaloPayOrder } from '@types';
import 'react-native-get-random-values';

export const searchByFirstLetter = (
  listItem: Array<DataModels.IReferenceOptions>,
  keyWord: string,
  isIgnoreValue?: boolean,
) => {
  const keyWordLowerKey = keyWord.toLowerCase();
  return listItem.filter((item) => {
    if (item.value && item.label) {
      const lettersInitial = item.label
        .match(/(\b\S)?/g)
        .join('')
        .toLowerCase();
      return (
        (!isIgnoreValue && item?.value.toLowerCase().match(keyWordLowerKey)) ||
        item?.label.toLowerCase().match(keyWordLowerKey) ||
        lettersInitial?.match(keyWordLowerKey)
      );
    }
    return false;
  });
};

export const getItemFromDataSource = (
  value: string,
  field: string,
  listRef: DataModels.IReferenceOptions[],
) => {
  const result = listRef.find((item) => item[field] === value);
  if (result) {
    return result;
  }
  return null;
};

export const formatCurrency = (amount: number) => {
  if (amount) {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
  return '0';
};

export const buildDataForSignature = (params: PaymentData) => {
  return `accessKey=${process.env.EXPO_PUBLIC_MOMO_ACCESS_KEY}&amount=${params.amount}&extraData=${params.extraData}&ipnUrl=${params.ipnUrl}&orderId=${params.orderId}&orderInfo=${params.orderInfo}&partnerCode=${process.env.EXPO_PUBLIC_MOMO_PARTNER_CODE}&redirectUrl=${params.redirectUrl}&requestId=${params.requestId}&requestType=captureWallet`;
};

export const generateMoMoSignature = (data: PaymentData) => {
  // Secret key
  const secretKey = process.env.EXPO_PUBLIC_MOMO_SECRET_KEY;

  const dataString = buildDataForSignature(data);

  // HMAC-SHA256
  const signature = CryptoJS.HmacSHA256(dataString, secretKey).toString(
    CryptoJS.enc.Hex,
  );

  return signature;
};

export const genZaloPayMac = (orderInfo: ZaloPayOrder) => {
  const hmacInput =
    orderInfo.appId +
    '|' +
    orderInfo.appTransId +
    '|' +
    orderInfo.appUser +
    '|' +
    orderInfo.amount +
    '|' +
    orderInfo.appTime +
    '|' +
    orderInfo.embedData +
    '|' +
    orderInfo.item;

  const mac = CryptoJS.HmacSHA256(
    hmacInput,
    process.env.EXPO_PUBLIC_ZALO_PAY_KEY,
  );

  return mac;
};

export const genZaloPayMacForFetchInfo = (
  appId: number,
  appTransId: string,
) => {
  const hmacInput =
    appId + '|' + appTransId + '|' + process.env.EXPO_PUBLIC_ZALO_PAY_KEY;

  const mac = CryptoJS.HmacSHA256(
    hmacInput,
    process.env.EXPO_PUBLIC_ZALO_PAY_KEY,
  );

  return mac;
};

export const genLocalId = (type?: string) => {
  return `local-${type && `${type}-`}${uuidv4()}`;
};

export const generateMoMoId = () => {
  const requestId = uuidv4();
  const orderId = genLocalId();

  return {
    requestId,
    orderId,
  };
};

export const generateUrl = (
  baseUrl: string,
  params: { [key: string]: string },
): string => {
  const queryParams = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&');

  return `${baseUrl}?${queryParams}`;
};

export const parseUrl = (url: string) => {
  const [path, queryString] = url.split('?');
  const params = {};

  if (queryString) {
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      params[key] = value;
    });
  }

  return {
    screen: path.replace('/', ''),
    params,
  };
};

export const getTimeOfDay = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export const formatCardNumber = (cardNumber: string) => {
  return `*${cardNumber.slice(-4)}`;
};

export const formatCardHolder = (cardHolder: string) => {
  const a = cardHolder.split(' ');
  return `*${a[a.length - 1]}`;
};

export const convertNumberToMonthYear = (text: string) => {
  // Remove non-numeric characters
  const numericText = text.replace(/[^0-9]/g, '');

  // Split into two parts and format as xx/xx
  if (numericText.length > 2) {
    const part1 = numericText.slice(0, 2);
    const part2 = numericText.slice(2, 4);
    return `${part1}/${part2}`;
  } else {
    // If less than 2 characters, just display the text as it is
    return numericText;
  }
};

export const compareVersions = (v1: string, v2: string): number => {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  const length = Math.max(parts1.length, parts2.length);
  for (let i = 0; i < length; i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;

    if (num1 > num2) return 1; // v1 > v2
    if (num1 < num2) return -1; // v1 < v2
  }

  return 0; // v1 = v2
};
