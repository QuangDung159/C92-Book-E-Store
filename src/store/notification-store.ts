import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { Platform } from 'react-native';
import { DataModels } from '@models';
import { NotificationServices } from '@services';

class NotificationStore {
  categorySelected: DataModels.ICategory | null = null;
  listNotification: DataModels.INotification[] = [];
  expoPushToken: string = '';
  latestNotification: Notifications.Notification | null = null;

  constructor() {
    makeObservable(this, {
      listNotification: observable,
      expoPushToken: observable,
      latestNotification: observable,
      setLatestNotification: action,
      setExpoPushToken: action,
      setListNotification: action,
      unReadNotification: computed,
    });
  }

  setLatestNotification(value: Notifications.Notification) {
    this.latestNotification = value;
  }

  setExpoPushToken(value: string) {
    this.expoPushToken = value;
  }

  setListNotification(values: DataModels.INotification[]) {
    this.listNotification = values;
  }

  get unReadNotification() {
    return this.listNotification.filter((item) => !item.readed);
  }

  loadNotification = async () => {
    runInAction(() => {
      NotificationServices.loadListNotification().then((value) => {
        this.setListNotification(value);
      });
    });
  };

  handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  async registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        this.handleRegistrationError(
          'Permission not granted to get push token for push notification!',
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        this.handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        this.handleRegistrationError(`${e}`);
      }
    } else {
      this.handleRegistrationError(
        'Must use physical device for push notifications',
      );
    }
  }
}

export { NotificationStore };
