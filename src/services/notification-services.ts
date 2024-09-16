import { API_URL, EXPO_PUSH_NOTIFICATION_URL } from '@constants';
import { DataModels } from '@models';
import { notificationStore } from '@store';
import { NotificationParam } from '@types';
import { HttpServices } from './http-services';

const sendPushNotification = async (
  pushNotificationParam: NotificationParam,
) => {
  const { sound, title, body, data, url, user } = pushNotificationParam;
  const message = {
    to: notificationStore.expoPushToken,
    sound: sound || 'default',
    title: title || 'Original Title',
    body: body || 'And here is the body!',
    data,
    url,
  };

  await createNotification({
    content: body,
    title,
    readed: false,
    data: {
      ...data,
      url,
    },
    user,
  });

  const result = await HttpServices.post(EXPO_PUSH_NOTIFICATION_URL, message);

  return result;
};

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
  sendPushNotification,
  fetchListNotification,
  onReadNotification,
  onDeleteNotification,
  onReadAllNotification,
  createNotification,
};
