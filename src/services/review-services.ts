import { DataModels } from '@models';
import { HttpServices } from './http-services';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL + '/review';

const submitComment = async (params: DataModels.IReviewInput) => {
  const result = await HttpServices.post(baseUrl, params);
  return result;
};

export const ReviewServices = {
  submitComment,
};
