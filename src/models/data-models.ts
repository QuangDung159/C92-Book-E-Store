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
