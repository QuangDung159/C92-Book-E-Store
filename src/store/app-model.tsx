import {
  CITY,
  DISTRICT,
  LIST_AUTHOR,
  LIST_FORM,
  LIST_PUBLISHER,
  WARD,
} from '@constants';
import { DataModels } from '@models';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
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

  constructor() {
    this.userStore = new UserStore();
    this.referenceOptionsStore = new ReferenceOptionsStore();
    this.cartStore = new CartStore(this.userStore, this.referenceOptionsStore);
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
    this.sharedStore = new SharedStore();
  }

  async appInit() {
    // this.userStore.setUserProfile(USER);
  }

  async login(user: DataModels.IUser) {
    this.userStore.setUserProfile(user);
  }

  async loadMasterData() {
    this.referenceOptionsStore.setAuthorDataSource(LIST_AUTHOR);
    this.referenceOptionsStore.setFormDataSource(LIST_FORM);
    this.referenceOptionsStore.setPublisherDataSource(LIST_PUBLISHER);
    this.referenceOptionsStore.setCityDataSource(CITY);
    this.referenceOptionsStore.setDistrictDataSource(DISTRICT);
    this.referenceOptionsStore.setWardDataSource(WARD);
  }
}

const instance = new AppModel();
export { instance as appModel };
