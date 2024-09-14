import { API_URL } from '@constants';
import { DataModels } from '@models';
import { HttpServices } from './http-services';

const submitComment = async (params: DataModels.IReviewInput) => {
  const result = await HttpServices.post(API_URL.review, params);
  return result;
};

export const ReviewServices = {
  submitComment,
};
