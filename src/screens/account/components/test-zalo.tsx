/* eslint-disable import/no-named-as-default */
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
import { ZaloPayServices } from '@services';
import { ZaloPayOrder } from '@types';
import { DatetimeHelpers } from '@utils';
import 'react-native-get-random-values';

const { PayZaloBridge } = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const TestZalo: React.FC<any> = () => {
  const [token, setToken] = useState('');
  const [returncode, setReturnCode] = useState('');

  useEffect(() => {
    const subscription = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      (data) => {
        if (data.returnCode == 1) {
          Alert.alert('Payment success!');
          Linking.openURL(
            `c92bookestorev1:///payment-success?orderId=${data.returnCode}&message=Payment success!`,
          );
        } else {
          Alert.alert('Payment fail!');
        }
      },
    );

    // Clean up the subscription on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>
        EXPO_PUBLIC_ZALO_PAY_APP_ID: {process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID}
      </Text>
      <Buttons.CButton
        label="createOrder"
        onPress={async () => {
          const appTransId =
            DatetimeHelpers.getCurrentDateYYMMDD() + '_' + new Date().getTime();
          const item = '[]';
          const description = 'Merchant description for order #' + appTransId;

          const order: ZaloPayOrder = {
            appId: process.env.EXPO_PUBLIC_ZALO_PAY_APP_ID,
            appUser: process.env.EXPO_PUBLIC_ZALO_PAY_APP_USER,
            appTime: new Date().getTime(),
            amount: 10000,
            appTransId,
            embedData:
              '{"redirecturl": "c92bookestorev1:///payment-success?orderId=123123&message=Payment success!"}',
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
