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

export { TOP_BOOKS, TOP_BOOKS_FILTER };
