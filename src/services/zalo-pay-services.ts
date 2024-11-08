import axios from 'axios';
import { NativeModules } from 'react-native';
import { ZaloPayOrder } from '@types';
import { StringHelpers } from '@utils';
import 'react-native-get-random-values';

const createOrder = async (
  orderInfo: ZaloPayOrder,
  onSuccess?: (returnCode?: any) => void,
  onFail?: (error?: any) => void,
) => {
  const mac = StringHelpers.genZaloPayMac(orderInfo);

  const order = {
    app_id: orderInfo.appId,
    app_user: orderInfo.appUser,
    app_time: orderInfo.appTime,
    amount: orderInfo.amount,
    app_trans_id: orderInfo.appTransId,
    embed_data: orderInfo.embedData,
    item: orderInfo.item,
    description: orderInfo.description,
    mac,
  };

  const formBody = [];
  for (const i in order) {
    const encodedKey = encodeURIComponent(i);
    const encodedValue = encodeURIComponent(order[i]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const formBodyStr = formBody.join('&');
  await fetch(process.env.EXPO_PUBLIC_ZALO_PAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBodyStr,
  })
    .then((response) => {
      return response.json();
    })
    .then((resJson) => {
      onSuccess?.(resJson);
    })
    .catch((error) => {
      console.log('Zalo Pay error :>> ', error);
      onFail?.(error);
    });
};

const fetchOrderInfo = async (appId: number, appTransId: string) => {
  const mac = StringHelpers.genZaloPayMacForFetchInfo(appId, appTransId);

  const order = {
    appid: appId,
    apptransid: appTransId,
    mac,
  };

  const formBody = [];
  for (const i in order) {
    const encodedKey = encodeURIComponent(i);
    const encodedValue = encodeURIComponent(order[i]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  const formBodyStr = formBody.join('&');
  try {
    const response = await axios.post(
      'https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid',
      formBodyStr,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      },
    );

    // Xử lý phản hồi
    console.log(response.data);
    return response;
  } catch (error) {
    // Xử lý lỗi
    console.error('Error:', error);
    return null;
  }
};

const payOrder = (zpTransToken: string) => {
  const payZP = NativeModules.PayZaloBridge;
  payZP.payOrder(zpTransToken);
};

export const ZaloPayServices = { createOrder, payOrder, fetchOrderInfo };
