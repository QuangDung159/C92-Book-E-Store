/* eslint-disable import/no-named-as-default */
import React, { useEffect, useRef, useState } from 'react';
import { AppState, Button, Text, View } from 'react-native';
import { Buttons } from '@components';
import { ZaloPayServices } from '@services';
import { ZaloPayOrder } from '@types';
import { DatetimeHelpers } from '@utils';
import 'react-native-get-random-values';

const TestZalo: React.FC<any> = () => {
  const [token, setToken] = useState('');
  const [returncode, setReturnCode] = useState('');
  const [appTransId, setAppTransId] = useState('');

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');

        if (appTransId) {
          ZaloPayServices.fetchOrderInfo(
            +process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
            appTransId,
          );
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [appTransId]);

  return (
    <View>
      <Buttons.CButton
        label="createOrder"
        onPress={async () => {
          const appTransIdGen =
            DatetimeHelpers.getCurrentDateYYMMDD() + '_' + new Date().getTime();
          setAppTransId(appTransIdGen);

          const item = '[]';
          const description =
            'Merchant description for order #' + appTransIdGen;

          const order: ZaloPayOrder = {
            appId: process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
            appUser: process.env.EXPO_PUBLIC_ZALO_PAY_APP_USER,
            appTime: new Date().getTime(),
            amount: 10000,
            appTransId: appTransIdGen,
            embedData:
              '{"promotioninfo":"","merchantinfo":"du lieu rieng cua ung dung","redirecturl": "c92bookestorev1:///payment-success?orderId=123123&message=Payment success!"}',
            item,
            description,
          };

          ZaloPayServices.createOrder(order, (response) => {
            setToken(response.zp_trans_token);
            setReturnCode(response.sub_return_code);
          });
        }}
      />
      <Text>ZpTranstoken: {token}</Text>
      <Text>returncode: {returncode}</Text>
      {+returncode === 1 && token ? (
        <Button
          title="payOrder"
          onPress={() => {
            ZaloPayServices.payOrder(token);
          }}
        />
      ) : null}
    </View>
  );
};

export { TestZalo };
