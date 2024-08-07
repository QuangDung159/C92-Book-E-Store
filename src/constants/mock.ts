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
    level: 1,
    child: [
      {
        id: 'cate_1_cate_1',
        name: 'Cate 1 - Cate 1',
        level: 2,
        child: [
          {
            id: 'cate_1_cate_1_cate_1',
            name: 'Cate 1 - Cate 1 - Cate 1',
            level: 3,
            child: [],
            parent: 'cate_1_cate_1',
          },
          {
            id: 'cate_1_cate_1_cate_2',
            name: 'Cate 1 - Cate 1 - Cate 2',
            level: 3,
            child: [],
            parent: 'cate_1_cate_1',
          },
          {
            id: 'cate_1_cate_1_cate_3',
            name: 'Cate 1 - Cate 1 - Cate 3',
            level: 3,
            child: [],
            parent: 'cate_1_cate_1',
          },
        ],
        parent: 'cate_1',
      },
      {
        id: 'cate_1_cate_2',
        name: 'Cate 1 - Cate 2',
        level: 2,
        child: [
          {
            id: 'cate_1_cate_2_cate_1',
            name: 'Cate 1 - Cate 2 - Cate 1',
            level: 3,
            child: [],
            parent: 'cate_1_cate_2',
          },
          {
            id: 'cate_1_cate_2_cate_2',
            name: 'Cate 1 - Cate 2 - Cate 2',
            level: 3,
            child: [],
            parent: 'cate_1_cate_2',
          },
          {
            id: 'cate_1_cate_2_cate_3',
            name: 'Cate 1 - Cate 2 - Cate 3',
            level: 3,
            child: [],
            parent: 'cate_1_cate_2',
          },
        ],
        parent: 'cate_1',
      },
    ],
    parent: null,
  },
  {
    id: 'cate_2',
    name: 'Cate 2',
    level: 1,
    child: [],
    parent: null,
  },
  {
    id: 'cate_3',
    name: 'Cate 3',
    level: 1,
    child: [],
    parent: null,
  },
];

export { CATEGORY, TOP_BOOKS, TOP_BOOKS_FILTER };
