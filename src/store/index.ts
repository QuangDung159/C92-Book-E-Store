import { appModel } from './app-model';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { ReferenceOptionsStore } from './reference-options-store';
import { SearchStore } from './search-store';
import { SharedStore } from './shared-store';
import { UserStore } from './user-store';

const {
  cartStore,
  categoryStore,
  searchStore,
  referenceOptionsStore,
  userStore,
  sharedStore,
} = appModel;

export {
  appModel,
  cartStore,
  categoryStore,
  referenceOptionsStore,
  searchStore,
  sharedStore,
  userStore,
};

export {
  CartStore,
  CategoryStore,
  ReferenceOptionsStore,
  SearchStore,
  SharedStore,
  UserStore,
};
