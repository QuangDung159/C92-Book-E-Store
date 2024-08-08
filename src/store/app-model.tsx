import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { SearchStore } from './search-store';

class AppModel {
  cartStore: CartStore;
  categoryStore: CategoryStore;
  searchStore: SearchStore;

  constructor() {
    this.cartStore = new CartStore();
    this.categoryStore = new CategoryStore();
    this.searchStore = new SearchStore();
  }
}

const instance = new AppModel();
export { instance as appModel };
