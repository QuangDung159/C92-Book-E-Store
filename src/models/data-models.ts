export interface IBook {
  id: string;
  name: string;
  price: number;
  isLiked: boolean;
  author: string;
  category: string;
}

export interface ITopBooksFilter {
  value: string;
  label: string;
}
