import { appModel } from './app-model';
import { AuthenticationStore } from './authentication-store';
import { CartStore } from './cart-store';
import { CategoryStore } from './category-store';
import { NotificationStore } from './notification-store';
import { ReferenceOptionsStore } from './reference-options-store';
import { SearchStore } from './search-store';
import { SharedStore } from './shared-store';
import { UserStore } from './user-store';
import { ValidationFormStore } from './validation-form-store';

const {
  cartStore,
  categoryStore,
  searchStore,
  referenceOptionsStore,
  userStore,
  sharedStore,
  notificationStore,
  authenticationStore,
  validationFormStore,
} = appModel;

export {
  appModel,
  authenticationStore,
  cartStore,
  categoryStore,
  notificationStore,
  referenceOptionsStore,
  searchStore,
  sharedStore,
  userStore,
  validationFormStore,
};

export {
  AuthenticationStore,
  CartStore,
  CategoryStore,
  NotificationStore,
  ReferenceOptionsStore,
  SearchStore,
  SharedStore,
  UserStore,
  ValidationFormStore,
};
