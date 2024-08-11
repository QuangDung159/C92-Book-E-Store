export interface IBook {
  id: string;
  name: string;
  price: number;
  isLiked: boolean;
  author: string;
  category: string;
  description?: string;
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
  author?: string;
  publisher?: string;
  form?: string;
}

export interface ISortOption {
  value: string;
  label: string;
}