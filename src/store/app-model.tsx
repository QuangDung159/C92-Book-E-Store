import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { ReferrenceOptionsStore } from './referrence-options-store';
import { SearchStore } from './search-store';

class AppModel {
  cartStore: CartStore;
  categoryStore: CategoryStore;
  searchStore: SearchStore;
  referenceOptionsStore: ReferrenceOptionsStore;

  constructor() {
    this.cartStore = new CartStore();
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
    this.referenceOptionsStore = new ReferrenceOptionsStore();
  }
}

const instance = new AppModel();
export { instance as appModel };
