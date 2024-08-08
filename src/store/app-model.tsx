import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';

class AppModel {
  cartStore: CartStore;
  categoryStore: CategoryStore;

  constructor() {
    this.cartStore = new CartStore();
    this.categoryStore = new CategoryStore();
  }
}

const instance = new AppModel();
export { instance as appModel };
