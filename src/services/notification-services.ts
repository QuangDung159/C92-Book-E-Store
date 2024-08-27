import { EXPO_PUSH_NOTIFICATION_URL, LIST_NOTIFICATION } from '@constants';
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
  const { expoPushToken, sound, title, body, data } = pushNotificationParam;
  const message = {
    to: expoPushToken,
    sound: sound || 'default',
    title: title || 'Original Title',
    body: body || 'And here is the body!',
    data,
  };

  const bodyParam = JSON.stringify(message);

  const result = await HttpServices.post(EXPO_PUSH_NOTIFICATION_URL, bodyParam);

  return result;
};

export const NotificationServices = {
  loadListNotification,
  sendPushNotification,
};
