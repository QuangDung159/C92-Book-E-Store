import axios from 'axios';
import { MOMO_REQUEST_TYPE } from '@constants';
import { PaymentData } from '@types';
import { StringHelpers } from '@utils';

const createMomoPayment = async (params: PaymentData) => {
  const signature = StringHelpers.generateMoMoSignature(params);

  const data = JSON.stringify({
    ...params,
    signature,
    partnerCode: process.env.EXPO_PUBLIC_MOMO_PARTNER_CODE,
    requestType: MOMO_REQUEST_TYPE,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios
    .request(config)
    .then((response) => {
      return {
        statusCode: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const MomoServices = { createMomoPayment };