import { appModel } from './app-model';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { NotificationStore } from './notification-store';
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
  notificationStore,
} = appModel;

export {
  appModel,
  cartStore,
  categoryStore,
  notificationStore,
  referenceOptionsStore,
  searchStore,
  sharedStore,
  userStore,
};

export {
  CartStore,
  CategoryStore,
  NotificationStore,
  ReferenceOptionsStore,
  SearchStore,
  SharedStore,
  UserStore,
};
