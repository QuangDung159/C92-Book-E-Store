/* eslint-disable import/no-named-as-default */
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Linking,
  NativeEventEmitter,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { Buttons } from '@components';
import 'react-native-get-random-values';

const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const TestZalo: React.FC<any> = () => {
  const [token, setToken] = useState('');
  const [returncode, setReturnCode] = useState('');

  function getCurrentDateYYMMDD() {
    const todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }

  useEffect(() => {
    const subscription = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      (data) => {
        console.log('data :>> ', data);
        if (data.returnCode == 1) {
          Alert.alert('Giao dịch thành công!');
          Linking.openURL(
            `c92bookestorev1:///payment-success?orderId=${data.returnCode}&message=Payment success!`,
          );
        } else {
          Alert.alert('Giao dịch thất bại!');
        }
      },
    );

    // Clean up the subscription on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  async function createOrder(money: number) {
    const apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();

    const appid = 2553;
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
    const mac = CryptoJS.HmacSHA256(
      hmacInput,
      'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    );
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

    console.log(order);

    const formBody = [];
    for (const i in order) {
      const encodedKey = encodeURIComponent(i);
      const encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const formBodyStr = formBody.join('&');
    await fetch('https://sb-openapi.zalopay.vn/v2/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBodyStr,
    })
      .then((response) => response.json())
      .then((resJson) => {
        setToken(resJson.zp_trans_token);
        setReturnCode(resJson.return_code);
      })
      .catch((error) => {
        console.log('error ', error);
      });
  }

  function payOrder() {
    const payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
  }

  return (
    <View>
      <Buttons.CButton label="createOrder" onPress={() => createOrder(10000)} />
      <Text>ZpTranstoken: {token}</Text>
      <Text>returncode: {returncode}</Text>
      {+returncode === 1 ? (
        <Button
          title="payOrder"
          onPress={() => {
            payOrder();
          }}
        />
      ) : null}
      <Buttons.CButton label="Zalo Pay" onPress={payOrder} />
    </View>
  );
};

export { TestZalo };
