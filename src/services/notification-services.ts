import { API_URL, EXPO_PUSH_NOTIFICATION_URL } from '@constants';
import { notificationStore } from '@store';
import { NotificationParam } from '@types';
import { HttpServices } from './http-services';

const sendPushNotification = async (
  pushNotificationParam: NotificationParam,
) => {
  const { sound, title, body, data } = pushNotificationParam;
  const message = {
    to: notificationStore.expoPushToken,
    sound: sound || 'default',
    title: title || 'Original Title',
    body: body || 'And here is the body!',
    data,
  };

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

export const NotificationServices = {
  sendPushNotification,
  fetchListNotification,
  onReadNotification,
  onDeleteNotification,
  onReadAllNotification,
};
