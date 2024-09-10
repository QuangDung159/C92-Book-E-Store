import { DataModels } from '@models';

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

const LIST_VOUCHER: DataModels.IVoucher[] = [
  {
    code: 'discount-1',
    id: '1',
    description:
      'discount 12 discount 12 discount 12 discount 12 discount 12 discount 12 discount 12 discount 12',
    discountValue: 12000,
  },
  {
    code: 'discount-2',
    id: '2',
    description:
      'discount 2 discount 2 discount 2 discount 2 discount 2 discount 2 discount 2 discount 2',
    discountValue: 17000,
  },
  {
    code: 'discount-3',
    id: '3',
    description:
      'discount 3 discount 3 discount 3 discount 3 discount 3 discount 3 discount 3 discount 3',
    discountValue: 10000,
  },
];

const LIST_NOTIFICATION: DataModels.INotification[] = [
  {
    id: '1',
    content:
      'Notification 1, Notification 1, Notification 1, Notification 1, Notification 1, Notification 1, Notification 1, Notification 1',
    title: 'Notification 1',
    readed: true,
  },
  {
    id: '2',
    content:
      'Notification 2, Notification 2, Notification 2, Notification 2, Notification 2, Notification 2, Notification 2, Notification 2, Notification 2',
    title: 'Notification 2',
    readed: false,
  },
  {
    id: '3',
    content:
      'Notification 3, Notification 3, Notification 3, Notification 3, Notification 3, Notification 3',
    title: 'Notification 3',
    readed: false,
  },
  {
    id: '4',
    content:
      'Notification 4, Notification 4, Notification 4, Notification 4, Notification 4, Notification 4',
    title: 'Notification 4',
    readed: false,
  },
  {
    id: '5',
    content:
      'Notification 5, Notification 5, Notification 5, Notification 5, Notification 5, Notification 5',
    title: 'Notification 5',
    readed: false,
  },
  {
    id: '6',
    content:
      'Notification 6, Notification 6, Notification 6, Notification 6, Notification 6, Notification 6',
    title: 'Notification 6',
    readed: false,
  },
  {
    id: '7',
    content:
      'Notification 7, Notification 7, Notification 7, Notification 7, Notification 7, Notification 7',
    title: 'Notification 7',
    readed: false,
  },
  {
    id: '8',
    content:
      'Notification 8, Notification 8, Notification 8, Notification 8, Notification 8, Notification 8',
    title: 'Notification 8',
    readed: true,
  },
];

export { CATEGORY, LIST_NOTIFICATION, LIST_VOUCHER };
