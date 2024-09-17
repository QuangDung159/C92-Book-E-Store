import { API_URL } from '@constants';
import { DataModels } from '@models';
import { HttpServices } from './http-services';

const fetchListNotification = async (userId: string) => {
  return await HttpServices.get(
    API_URL.notification + `/get-by-user?userId=${userId}`,
  );
};

const onReadAllNotification = async (userId: string) => {
  return await HttpServices.get(
    API_URL.notification + `/read-all-and-get-by-user?userId=${userId}`,
  );
};

const onReadNotification = async (
  userId: string,
  notificationId: string,
  readed: boolean,
) => {
  return await HttpServices.post(
    API_URL.notification + '/update-one-and-get-by-user',
    {
      user: userId,
      id: notificationId,
      readed,
    },
  );
};

const onDeleteNotification = async (userId: string, notificationId: string) => {
  return await HttpServices.post(
    API_URL.notification + '/delete-and-get-by-user',
    {
      user: userId,
      id: notificationId,
    },
  );
};

const createNotification = async (params: DataModels.INotification) => {
  return await HttpServices.post(
    API_URL.notification + '/create-one-and-get-by-user',
    params,
  );
};

export const NotificationServices = {
  fetchListNotification,
  onReadNotification,
  onDeleteNotification,
  onReadAllNotification,
  createNotification,
};
