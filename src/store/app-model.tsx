import { CartStore } from './cart-store';

class AppModel {
  cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore();
  }
}

const instance = new AppModel();
export { instance as appModel };
