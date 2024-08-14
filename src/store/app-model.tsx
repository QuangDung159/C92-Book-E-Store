import { LIST_AUTHOR, LIST_FORM, LIST_PUBLISHER, USER } from '@constants';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { ReferrenceOptionsStore } from './referrence-options-store';
import { SearchStore } from './search-store';
import { UserStore } from './user-store';

class AppModel {
  cartStore: CartStore;
  categoryStore: CategoryStore;
  searchStore: SearchStore;
  referenceOptionsStore: ReferrenceOptionsStore;
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
    this.cartStore = new CartStore(this.userStore);
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
    this.referenceOptionsStore = new ReferrenceOptionsStore();
  }

  async appInit() {
    this.userStore.setUserProfile(USER);
  }

  async loadMasterData() {
    this.referenceOptionsStore.setAuthorDataSource(LIST_AUTHOR);
    this.referenceOptionsStore.setFormDataSource(LIST_FORM);
    this.referenceOptionsStore.setPublisherDataSource(LIST_PUBLISHER);
  }
}

const instance = new AppModel();
export { instance as appModel };
