export interface IReviewInput {
  rating: number;
  createdAt: string; // MM/dd/yyyy hh:mm:ss tt
  content: string;
  userName: string;
}

export interface IReview {
  rating: number;
  createdAt: string; // MM/dd/yyyy hh:mm:ss tt
  content: string;
  userName: string;
  avartar?: string;
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
}

export interface IShippingAddress {
  id: string;
  address: string;
  district: string;
  ward: string;
  city: string;
  shippingFee: number;
  primary: boolean;
}

export interface IPaymentMethod {
  paymentType: string;
  paymentInfo?: any | ICreditCard;
}

export interface IVoucher {
  id: string;
  code: string;
  description: string;
  discountValue: number;
}

export interface ICart {
  id: string;
  listCartItem: ICartItem[];
  subTotal: number;
  shipping: number;
  discount: number;
  shippingAddress: string;
  paymentMethod: IPaymentMethod;
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

export interface ICreditCard {
  cardNumber: string;
  cardHolder: string;
  cartType: string;
}

export interface IUser {
  username: string;
  listShippingAddress: IShippingAddress[];
  listCreditCard: ICreditCard[];
}
