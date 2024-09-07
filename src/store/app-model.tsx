/* eslint-disable import/no-named-as-default */
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Notifications from 'expo-notifications';
import { LIST_HOME_PAGE_TITLE } from '@constants';
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

    //
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
  }

  async logout() {
    this.userStore.setUserProfile(null);

    this.notificationStore.setListNotification([]);
  }

  async loadMasterData() {
    this.referenceOptionsStore.fetchListAdministrative('province');
    this.referenceOptionsStore.fetchListAdministrative('district');
    this.referenceOptionsStore.fetchListAdministrative('ward');

    this.referenceOptionsStore.fetchListAuthor();
    this.referenceOptionsStore.fetchListPublisher();
    this.referenceOptionsStore.fetchListForm();

    this.searchStore.fetchListBookHomePage(LIST_HOME_PAGE_TITLE.latest);
    this.searchStore.fetchListBookHomePage(LIST_HOME_PAGE_TITLE.topBook);
    this.searchStore.fetchListBookHomePage(LIST_HOME_PAGE_TITLE.upcomming);

    this.categoryStore.fetchListCategory();

    await this.authenticationStore.fetchUser();

    if (this.userStore.authenticated) {
      await this.cartStore.fetchCart(this.userStore.userProfile.id);
    }

    this.userStore.fetchListOrder('created');
    this.userStore.fetchListOrder('completed');
    this.userStore.fetchListOrder('processing');
    this.userStore.fetchListOrder('canceled');
  }
}

const instance = new AppModel();
export { instance as appModel };
