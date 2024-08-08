import { DataModels } from '@models';

const TOP_BOOKS: Array<DataModels.IBook> = [
  {
    name: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    price: 25,
    isLiked: false,
    category: 'Classics',
    id: '1',
  },
  {
    name: 'Nine Liars',
    author: 'Oscar Wilde',
    price: 25.99,
    isLiked: true,
    category: 'Classics',
    id: '2',
  },
  {
    name: 'The Picture of Dorian Gray 12',
    author: 'Oscar Wilde 123',
    price: 25,
    isLiked: false,
    category: 'Classics',
    id: '3',
  },
  {
    name: 'The Picture of Dorian 44v',
    author: 'Oscar Wilde 44',
    price: 19,
    isLiked: false,
    category: 'Fantasy',
    id: '4',
  },
];

const TOP_BOOKS_FILTER = [
  {
    label: 'This Week',
    value: 'week',
  },
  {
    label: 'This Month',
    value: 'month',
  },
  {
    label: 'This Year',
    value: 'year',
  },
];

const CATEGORY: Array<DataModels.ICategory> = [
  {
    id: 'cate_1',
    name: 'Cate 1',
    parent: null,
    hasChild: true,
  },
  {
    id: 'cate_1_1',
    name: 'Cate 1 - 1',
    parent: 'cate_1',
    hasChild: true,
  },
  {
    id: 'cate_1_1_1',
    name: 'Cate 1 - 1 - 1',
    parent: 'cate_1_1',
    hasChild: false,
  },
  {
    id: 'cate_1_1_2',
    name: 'Cate 1 - 1 - 2',
    parent: 'cate_1_1',
    hasChild: false,
  },
  {
    id: 'cate_1_2',
    name: 'Cate 1 - 2',
    parent: 'cate_1',
    hasChild: true,
  },
  {
    id: 'cate_1_2_1',
    name: 'Cate 1 - 2 - 1',
    parent: 'cate_1_2',
    hasChild: false,
  },
  {
    id: 'cate_1_2_2',
    name: 'Cate 1 - 2 - 2',
    parent: 'cate_1_2',
    hasChild: false,
  },
  {
    id: 'cate_1_2_3',
    name: 'Cate 1 - 2 - 3',
    parent: 'cate_1_2',
    hasChild: false,
  },
  {
    id: 'cate_1_2_4',
    name: 'Cate 1 - 2 - 4',
    parent: 'cate_1_2',
    hasChild: false,
  },
  {
    id: 'cate_1_2_5',
    name: 'Cate 1 - 2 - 5',
    parent: 'cate_1_2',
    hasChild: false,
  },
  {
    id: 'cate_2',
    name: 'Cate 2',
    parent: null,
    hasChild: true,
  },
  {
    id: 'cate_2_1',
    name: 'Cate 2 - 1',
    parent: 'cate_2',
    hasChild: false,
  },
  {
    id: 'cate_2_2',
    name: 'Cate 2 - 2',
    parent: 'cate_2',
    hasChild: false,
  },
  {
    id: 'cate_3',
    name: 'Cate 3',
    parent: null,
    hasChild: false,
  },
];

export { CATEGORY, TOP_BOOKS, TOP_BOOKS_FILTER };
