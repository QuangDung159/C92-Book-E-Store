import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { DataModels } from '@models';
import { PaymentData } from '@types';
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
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const getFullAddress = (address: DataModels.IShippingAddress) => {
  return `${address.address}, ${address.ward}, ${address.district}, ${address.city}`;
};

export const getShortAddress = (address: DataModels.IShippingAddress) => {
  return `${address.ward}, ${address.district}, ${address.city}`;
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

export const generateMoMoId = () => {
  const requestId = uuidv4();
  const orderId = uuidv4();

  return {
    requestId,
    orderId,
  };
};
