import CryptoJS from 'crypto-js';
import { NativeModules } from 'react-native';
import { DatetimeHelpers } from '@utils';
import 'react-native-get-random-values';

const createOrder = async (
  money: number,
  onSuccess: (returnCode?: number) => void,
  onFail: (error?: any) => void,
) => {
  const apptransid =
    DatetimeHelpers.getCurrentDateYYMMDD() + '_' + new Date().getTime();

  const appid = process.env.EXPO_ZALO_PAY_APP_ID;
  const amount = money;
  const appuser = 'ZaloPayDemo';
  const apptime = new Date().getTime();
  const embeddata = '{}';
  const item = '[]';
  const description = 'Merchant description for order #' + apptransid;
  const hmacInput =
    appid +
    '|' +
    apptransid +
    '|' +
    appuser +
    '|' +
    amount +
    '|' +
    apptime +
    '|' +
    embeddata +
    '|' +
    item;
  const mac = CryptoJS.HmacSHA256(hmacInput, process.env.EXPO_ZALO_PAY_KEY);
  console.log('====================================');
  console.log('hmacInput: ' + hmacInput);
  console.log('mac: ' + mac);
  console.log('====================================');
  const order = {
    app_id: appid,
    app_user: appuser,
    app_time: apptime,
    amount: amount,
    app_trans_id: apptransid,
    embed_data: embeddata,
    item: item,
    description: description,
    mac: mac,
  };

  console.log('order :>> ', order);

  const formBody = [];
  for (const i in order) {
    const encodedKey = encodeURIComponent(i);
    const encodedValue = encodeURIComponent(order[i]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const formBodyStr = formBody.join('&');
  await fetch(process.env.EXPO_ZALO_PAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBodyStr,
  })
    .then((response) => response.json())
    .then((resJson) => {
      onSuccess(resJson.returnCode);
    })
    .catch((error) => {
      console.log('error ', error);
      onFail(error);
    });
};

const payOrder = (token: string) => {
  const payZP = NativeModules.PayZaloBridge;
  payZP.payOrder(token);
};

export const ZaloPayServices = { createOrder, payOrder };
