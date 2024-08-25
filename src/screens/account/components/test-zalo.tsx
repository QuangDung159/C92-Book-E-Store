import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Button, Linking, Text, View } from 'react-native';
import { Buttons } from '@components';
import { DEEP_LINK_PAYMENT_SUCCESS_URL } from '@constants';
import { ZaloPayServices } from '@services';
import { ZaloPayOrder } from '@types';
import { DatetimeHelpers, delay } from '@utils';
import 'react-native-get-random-values';

const TestZalo: React.FC<any> = () => {
  const [token, setToken] = useState('');
  const [returncode, setReturnCode] = useState('');
  const [appTransId, setAppTransId] = useState('');

  const appState = useRef(AppState.currentState);
  const [fetchDone, setFetchDone] = useState(false);

  const onFetchPaymentInfo = useCallback(async (appTransId: string) => {
    const response = await ZaloPayServices.fetchOrderInfo(
      +process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
      appTransId,
    );

    if (response.status === 200 && response.data) {
      if (response.data.returncode === 1) {
        console.log('payment success');
        setFetchDone(true);
        delay(1000).then(() => {
          Linking.openURL(
            `${DEEP_LINK_PAYMENT_SUCCESS_URL}orderId=${response.data.zptransid}&message=Payment success with Zalo Pay!`,
          );
        });
      }
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !fetchDone
      ) {
        if (appTransId) {
          onFetchPaymentInfo(appTransId);
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [appTransId, fetchDone, onFetchPaymentInfo]);

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
            embedData: '{"promotioninfo":""}',
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
            setFetchDone(false);
          }}
        />
      ) : null}
    </View>
  );
};

export { TestZalo };
