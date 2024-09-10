import {
  API_URL,
  EXPO_PUSH_NOTIFICATION_URL,
  LIST_NOTIFICATION,
} from '@constants';
import { notificationStore } from '@store';
import { NotificationParam } from '@types';
import { delay } from '@utils';
import { HttpServices } from './http-services';

const loadListNotification = async () => {
  await delay(1000);

  return LIST_NOTIFICATION;
};

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

export const NotificationServices = {
  loadListNotification,
  sendPushNotification,
  fetchListNotification,
};
