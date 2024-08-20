import axios, { AxiosInstance } from 'axios';

// Khởi tạo một instance của axios với URL cơ bản
const apiClientDefault = axios.create({
  baseURL: 'https://test-payment.momo.vn/v2/gateway/api', // Ví dụ URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const post = async (url: string, data: any, apiClient?: AxiosInstance) => {
  try {
    const response = await (apiClient || apiClientDefault).post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error creating post', error);
    throw error;
  }
};

const get = async (url: string, apiClient?: AxiosInstance) => {
  try {
    const response = await (apiClient || apiClientDefault).get(url);
    return response.data;
  } catch (error) {
    console.error('Error creating post', error);
    throw error;
  }
};

export const HttpServices = { post, get };
