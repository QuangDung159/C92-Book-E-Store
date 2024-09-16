import { ERROR_CODES } from '@constants';
import {
  CartStatus,
  OrderStatus,
  PaymentCardType,
  PaymentStatus,
  PaymentType,
  SignUpMethod,
} from '@types';

export interface IReviewInput {
  rating: number;
  createdAt: string; // MM/dd/yyyy hh:mm:ss tt
  content: string;
  name: string;
  avartarUrl?: string;
  book: string;
}

export interface IReview {
  rating: number;
  createdAt: string; // MM/dd/yyyy hh:mm:ss tt
  content: string;
  name: string;
  avartarUrl?: string;
  id: string;
}
export interface IBook {
  id: string;
  name: string;
  price: number;
  isLiked: boolean;
  author: IAuthor;
  category: ICategory;
  description?: string;
  rating?: number;
  pageCount?: number;
  height?: number;
  width?: number;
  thick?: number;
  reviews?: IReview[];
  stock?: number;
  form?: IForm;
  publisher?: IPublisher;
  priceNotSale?: number;
  count?: number;
}

export interface ICartItem {
  id?: string;
  book: IBook;
  count: number;
  price?: number;
}

export interface IShippingAddress {
  id: string;
  address: string;
  district: string;
  ward: string;
  province: string;
  shippingFee: number;
  primary: boolean;
  name: string;
  phoneNumber: string;
}

export interface IPaymentMethod {
  id: string;
  paymentType: PaymentType;
  paymentInfo?: any | ICreditCard;
}

export interface IVoucher {
  id: string;
  code: string;
  description: string;
  discountValue: number;
}

export interface ICartParams {
  subTotal?: number;
  shipping?: number;
  discount?: number;
  shippingAddress?: string;
  paymentType?: string;
  paymentInfo?: string;
  total?: number;
  status?: string;
  user?: string;
  id?: string;
  shippingInfo?: string;
}

export interface ICart {
  id: string;
  listCartItem: ICartItem[];
  subTotal: number;
  shipping: number;
  discount: number;
  shippingAddress: string;
  paymentMethod?: IPaymentMethod;
  paymentType?: string;
  paymentInfo?: any;
  total?: number;
  status?: CartStatus;
  user?: string;
  shippingInfo?: string;
}

export interface ITopBooksFilter {
  value: string;
  label: string;
}

export interface ICategory {
  id: string;
  name: string;
  parent?: string;
  hasChild: boolean;
}

export interface ISearchFilter {
  category?: string;
  max?: number;
  min?: number;
  author?: string[];
  publisher?: string[];
  form?: string[];
}

export interface ISortOption {
  value: string;
  label: string;
  field?: string;
}

export interface IAuthor {
  id: string;
  name: string;
}

export interface IForm {
  id: string;
  name: string;
}

export interface IPublisher {
  id: string;
  name: string;
}

export interface IReferenceOptions {
  label: string;
  value: string;
  extraData?: any;
}

export interface ICreditCardParams {
  id?: string;
  cardNumber: string;
  cardHolder: string;
  cardType: PaymentCardType;
  expirationDate: string;
  user?: string;
}

export interface ICreditCard {
  id?: string;
  cardNumber: string;
  cardHolder: string;
  cardType: PaymentCardType;
  expirationDate: string;
}

export interface IUser {
  username: string;
  listShippingAddress: IShippingAddress[];
  listCreditCard: ICreditCard[];
  email: string;
  phoneNumber: string;
  password: string;
  avatarUrl?: string;
  id: string;
  listBookViewed?: string[];
  listBookLiked?: string[];
  signUpMethod?: SignUpMethod;
  ssoToken?: string;
}

export interface ILocation {
  id: string;
  name: string;
  parent?: string;
}

export interface INotification {
  id?: string;
  title: string;
  content: string;
  readed: boolean;
  url?: string;
  user?: string;
}

export interface ServiceResult<T> {
  success: boolean;
  errorCode?: ERROR_CODES;
  errorMessage?: string;
  isSystemError?: boolean;
  data?: T;
  customData?: any;
  errors?: any[];
  error?: any;
}

export interface IOrder {
  id: string;
  cart: ICart;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
}

export interface IConfig {
  id: string;
  key: string;
  value: string;
}

export interface IReverseGeocode {
  city: string;
  region: string;
  country: string;
  postalCode: string;
  street: string;
}
