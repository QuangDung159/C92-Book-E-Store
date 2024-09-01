import axios, { AxiosInstance } from 'axios';
import { DataModels } from '@models';

// Khởi tạo một instance của axios với URL cơ bản
const apiClientDefault = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const post = async (
  url: string,
  data: any,
  apiClient?: AxiosInstance,
): Promise<DataModels.ServiceResult<any>> => {
  try {
    const response = await (apiClient || apiClientDefault).post(
      url,
      JSON.stringify(data),
    );
    return buildAxiosResponse({
      success: true,
      data: response.data.data,
    });
  } catch (error) {
    console.log('Http.post error :>> ', error);
    console.log('Http.post error url :>> ', url);
    console.log('Http.post error params :>> ', JSON.stringify(data));
    return buildAxiosResponse({
      success: false,
      errorMessage: error,
    });
  }
};

const get = async (
  url: string,
  apiClient?: AxiosInstance,
): Promise<DataModels.ServiceResult<any>> => {
  try {
    const response = await (apiClient || apiClientDefault).get(url);
    return buildAxiosResponse({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log('Http.get error :>> ', error);
    console.log('Http.get error url :>> ', url);
    return buildAxiosResponse({
      success: false,
      errorMessage: error,
    });
  }
};

const buildAxiosResponse = (
  serviceResult: DataModels.ServiceResult<any>,
): DataModels.ServiceResult<any> => {
  return serviceResult;
};

export const HttpServices = { post, get, buildAxiosResponse };
