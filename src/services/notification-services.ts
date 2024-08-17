import { LIST_NOTIFICATION } from '@constants';
import { delay } from '@utils';

const loadListNotification = async () => {
  await delay(1000);

  return LIST_NOTIFICATION;
};

export const NotificationServices = {
  loadListNotification,
};
