/* eslint-disable import/no-named-as-default */
import * as Installations from '@react-native-firebase/installations';
import * as Notifications from 'expo-notifications';
import {
  LIST_AUTHOR,
  LIST_CITY,
  LIST_DISTRICT,
  LIST_FORM,
  LIST_PUBLISHER,
  LIST_WARD,
} from '@constants';
import { AuthenticationStore } from './authentication-store';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { NotificationStore } from './notification-store';
import { ReferenceOptionsStore } from './reference-options-store';
import { SearchStore } from './search-store';
import { SharedStore } from './shared-store';
import { UserStore } from './user-store';

class AppModel {
  cartStore: CartStore;
  categoryStore: CategoryStore;
  searchStore: SearchStore;
  referenceOptionsStore: ReferenceOptionsStore;
  userStore: UserStore;
  sharedStore: SharedStore;
  notificationStore: NotificationStore;
  authenticationStore: AuthenticationStore;

  constructor() {
    this.userStore = new UserStore();
    this.referenceOptionsStore = new ReferenceOptionsStore();
    this.cartStore = new CartStore(this.userStore, this.referenceOptionsStore);
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
    this.sharedStore = new SharedStore();
    this.notificationStore = new NotificationStore();
    this.authenticationStore = new AuthenticationStore(this.userStore);
  }

  async appInit() {
    // this.userStore.setUserProfile(USER);

    // set notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // get expo notification token
    this.notificationStore
      .registerForPushNotificationsAsync()
      .then((token) => this.notificationStore.setExpoPushToken(token ?? ''))
      .catch((error: any) =>
        this.notificationStore.setExpoPushToken(`${error}`),
      );

    this.getInstallationId();
  }

  async getInstallationId() {
    const installations = Installations.getInstallations();
    const id = await Installations.getId(installations);
    console.log('installationsId :>> ', id);
  }

  async logout() {
    this.userStore.setUserProfile(null);

    this.notificationStore.setListNotification([]);
  }

  async loadMasterData() {
    this.referenceOptionsStore.setAuthorDataSource(LIST_AUTHOR);
    this.referenceOptionsStore.setFormDataSource(LIST_FORM);
    this.referenceOptionsStore.setPublisherDataSource(LIST_PUBLISHER);
    this.referenceOptionsStore.setCityDataSource(LIST_CITY);
    this.referenceOptionsStore.setDistrictDataSource(LIST_DISTRICT);
    this.referenceOptionsStore.setWardDataSource(LIST_WARD);
  }
}

const instance = new AppModel();
export { instance as appModel };
