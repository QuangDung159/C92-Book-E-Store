import {
  LIST_AUTHOR,
  LIST_CITY,
  LIST_DISTRICT,
  LIST_FORM,
  LIST_PUBLISHER,
  LIST_WARD,
} from '@constants';
import { DataModels } from '@models';
import { NotificationServices } from '@services';
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

  constructor() {
    this.userStore = new UserStore();
    this.referenceOptionsStore = new ReferenceOptionsStore();
    this.cartStore = new CartStore(this.userStore, this.referenceOptionsStore);
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
    this.sharedStore = new SharedStore();
    this.notificationStore = new NotificationStore();
  }

  async appInit() {
    // this.userStore.setUserProfile(USER);
  }

  async login(user: DataModels.IUser) {
    this.userStore.setUserProfile(user);

    const listNotification = await NotificationServices.loadListNotification();
    this.notificationStore.setListNotification(listNotification);
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
