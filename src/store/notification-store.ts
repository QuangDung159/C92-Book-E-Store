/* eslint-disable import/no-named-as-default */
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { action, computed, makeObservable, observable } from 'mobx';
import { Platform } from 'react-native';
import { DataModels } from '@models';
import { NotificationServices } from '@services';
import { delay, ToastHelpers } from '@utils';
import { UserStore } from './user-store';

class NotificationStore {
  categorySelected: DataModels.ICategory | null = null;
  listNotification: DataModels.INotification[] = [];
  expoPushToken: string = '';
  latestNotification: Notifications.Notification | null = null;
  userStore: UserStore | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      listNotification: observable,
      expoPushToken: observable,
      latestNotification: observable,
      userStore: observable,
      setLatestNotification: action,
      setExpoPushToken: action,
      setListNotification: action,
      unReadNotification: computed,
    });

    this.userStore = userStore;
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
    if (this.userStore.userProfile?.id) {
      const result = await NotificationServices.fetchListNotification(
        this.userStore.userProfile?.id,
      );

      if (result?.success && result.data?.listNotification) {
        this.setListNotification(result.data.listNotification);
      }
    }
  };

  onReadNotification = async (notificationId: string, readed: boolean) => {
    const result = await NotificationServices.onReadNotification(
      this.userStore.userProfile.id,
      notificationId,
      readed,
    );

    if (result?.success && result.data?.listNotification) {
      this.setListNotification(result.data.listNotification);
    }
  };

  onReadAllNotification = async () => {
    const result = await NotificationServices.onReadAllNotification(
      this.userStore.userProfile.id,
    );

    if (result?.success && result.data?.listNotification) {
      this.setListNotification(result.data.listNotification);
    }
  };

  onDeleteNotification = async (notificationId: string) => {
    const result = await NotificationServices.onDeleteNotification(
      this.userStore.userProfile.id,
      notificationId,
    );

    if (result?.success && result.data?.listNotification) {
      this.setListNotification(result.data.listNotification);
    }
  };

  handleRegistrationError(errorMessage: string) {
    ToastHelpers.showToast({
      content: errorMessage,
      type: 'error',
      title: 'Error',
    });
    throw new Error(errorMessage);
  }

  // async registerForPushNotificationsAsync() {
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   if (Device.isDevice) {
  //     await delay(2000);
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();

  //     let finalStatus = existingStatus;

  //     Alert.alert(`existingStatus: ${existingStatus}`);

  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }

  //     Alert.alert(`finalStatus: ${finalStatus}`);

  //     if (finalStatus !== 'granted') {
  //       this.handleRegistrationError(
  //         'Permission not granted to get push token for push notification!',
  //       );
  //       return;
  //     }

  //     const projectId =
  //       Constants?.expoConfig?.extra?.eas?.projectId ??
  //       Constants?.easConfig?.projectId;

  //     if (!projectId) {
  //       this.handleRegistrationError('Project ID not found');
  //     }

  //     try {
  //       const pushTokenString = (
  //         await Notifications.getExpoPushTokenAsync({
  //           projectId,
  //         })
  //       ).data;
  //       console.log(pushTokenString);
  //       return pushTokenString;
  //     } catch (e: unknown) {
  //       this.handleRegistrationError(`${e}`);
  //     }
  //   } else {
  //     this.handleRegistrationError(
  //       'Must use physical device for push notifications',
  //     );
  //   }
  // }

  async registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
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
        await Notifications.requestPermissionsAsync();

        // 💡 Delay after request
        await delay(1000);

        const { status: recheckStatus } =
          await Notifications.getPermissionsAsync();
        finalStatus = recheckStatus;
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
        return;
      }

      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({ projectId })
        ).data;
        console.log('Expo push token:', pushTokenString);
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
