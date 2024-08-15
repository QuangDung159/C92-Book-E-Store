import { DataModels } from '@models';

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

const LIST_AUTHOR: DataModels.IAuthor[] = [
  {
    id: 'author_1',
    name: 'Author 1',
  },
  {
    id: 'author_2',
    name: 'Author 2',
  },
  {
    id: 'author_3',
    name: 'Author 3',
  },
  {
    id: 'author_4',
    name: 'Author 4',
  },
  {
    id: 'author_5',
    name: 'Author 5',
  },
  {
    id: 'author_6',
    name: 'Author 6',
  },
  {
    id: 'author_7',
    name: 'Author 7',
  },
  {
    id: 'author_8',
    name: 'Author 8',
  },
  {
    id: 'author_9',
    name: 'Author 9',
  },
  {
    id: 'author_10',
    name: 'Author 10',
  },
];

const LIST_FORM: DataModels.IForm[] = [
  {
    id: 'form_1',
    name: 'Form 1',
  },
  {
    id: 'form_2',
    name: 'Form 2',
  },
  {
    id: 'form_3',
    name: 'Form 3',
  },
  {
    id: 'form_4',
    name: 'Form 4',
  },
  {
    id: 'form_5',
    name: 'Form 5',
  },
  {
    id: 'form_6',
    name: 'Form 6',
  },
  {
    id: 'form_7',
    name: 'Form 7',
  },
  {
    id: 'form_8',
    name: 'Form 8',
  },
  {
    id: 'form_9',
    name: 'Form 9',
  },
  {
    id: 'form_10',
    name: 'Form 10',
  },
];

const LIST_PUBLISHER: DataModels.IForm[] = [
  {
    id: 'publisher_1',
    name: 'Publisher 1',
  },
  {
    id: 'publisher_2',
    name: 'Publisher 2',
  },
  {
    id: 'publisher_3',
    name: 'Publisher 3',
  },
  {
    id: 'publisher_4',
    name: 'Publisher 4',
  },
  {
    id: 'publisher_5',
    name: 'Publisher 5',
  },
  {
    id: 'publisher_6',
    name: 'Publisher 6',
  },
  {
    id: 'publisher_7',
    name: 'Publisher 7',
  },
  {
    id: 'publisher_8',
    name: 'Publisher 8',
  },
  {
    id: 'publisher_9',
    name: 'Publisher 9',
  },
  {
    id: 'publisher_10',
    name: 'Publisher 10',
  },
];

const LIST_SORT_OPTION = [
  {
    value: 'name_asc',
    label: 'Name ASC',
  },
  {
    value: 'name_desc',
    label: 'Name DESC',
  },
  {
    value: 'price_asc',
    label: 'Price ASC',
  },
  {
    value: 'price_desc',
    label: 'Price DESC',
  },
];

const LIST_PAYMENT_METHOD = [
  {
    value: 'cod',
    label: 'Cash on Delivery',
  },
  {
    value: 'momo',
    label: 'Momo',
  },
  {
    value: 'zalo_pay',
    label: 'Zalo Pay',
  },
  {
    value: 'credit_card',
    label: 'Credit Card',
  },
];

const TOP_BOOKS: Array<DataModels.IBook> = [
  {
    name: 'The The The The The The The The The The The The The The The The The The The The The The The The',
    author: LIST_AUTHOR[0],
    price: 25000999,
    priceNotSale: 0,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[2],
    form: LIST_FORM[0],
    publisher: LIST_PUBLISHER[0],
    count: 1,
    stock: 5,
    id: '1',
    reviews: [
      {
        content:
          '123 asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd',
        createdAt: '12/12/12 12:12:12 PM',
        rating: 4,
        userName: 'asd asd asd asd asd asd asd asd asd asd asd',
        id: '1',
      },
      {
        content: '123 123 123',
        createdAt: '12/12/12 12:12:12 PM',
        rating: 4,
        userName: 'asd 123',
        id: '2',
      },
      {
        content: '123 45 345',
        createdAt: '12/12/12 12:12:12 AM',
        rating: 2,
        userName: 'asd 345',
        id: '3',
      },
      {
        content: '123',
        createdAt: '12/12/12 12:12:12 PM',
        rating: 4,
        userName: 'asd',
        id: '4',
      },
    ],
  },
  {
    name: 'Nine Liars',
    author: LIST_AUTHOR[0],
    price: 259900,
    priceNotSale: 1000000,
    isLiked: true,
    rating: 4,
    width: 120,
    height: 60,
    thick: 3,
    pageCount: 200,
    category: CATEGORY[3],
    form: LIST_FORM[0],
    publisher: LIST_PUBLISHER[0],
    count: 1,
    stock: 5,
    id: '2',
  },
  {
    name: 'The Picture of Dorian Gray 12',
    author: LIST_AUTHOR[1],
    price: 25000,
    priceNotSale: 1000000,
    isLiked: true,
    rating: 4,
    width: 120,
    height: 60,
    thick: 3,
    pageCount: 200,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[1],
    form: LIST_FORM[0],
    publisher: LIST_PUBLISHER[1],
    count: 1,
    stock: 5,
    id: '3',
  },
  {
    name: 'The Picture of Dorian 44v',
    author: LIST_AUTHOR[2],
    price: 19000,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[2],
    form: LIST_FORM[1],
    publisher: LIST_PUBLISHER[2],
    count: 1,
    stock: 5,
    id: '4',
  },
  {
    name: 'The Picture of Dorian Gray 12',
    author: LIST_AUTHOR[1],
    price: 250000,
    priceNotSale: 1000000,
    isLiked: true,
    rating: 4,
    width: 120,
    height: 60,
    thick: 3,
    pageCount: 200,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[1],
    form: LIST_FORM[1],
    publisher: LIST_PUBLISHER[0],
    count: 1,
    stock: 5,
    id: '5',
  },
  {
    name: 'The Picture of Dorian 44v',
    author: LIST_AUTHOR[2],
    price: 190000,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[2],
    form: LIST_FORM[2],
    publisher: LIST_PUBLISHER[2],
    count: 1,
    stock: 5,
    id: '6',
  },
  {
    name: 'The Picture of Dorian Gray 12',
    author: LIST_AUTHOR[1],
    price: 25000,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[1],
    form: LIST_FORM[2],
    publisher: LIST_PUBLISHER[3],
    count: 1,
    stock: 5,
    id: '7',
  },
  {
    name: 'The Picture of Dorian 44v',
    author: LIST_AUTHOR[3],
    price: 19000,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[2],
    form: LIST_FORM[4],
    publisher: LIST_PUBLISHER[1],
    count: 1,
    stock: 5,
    id: '8',
  },
  {
    name: 'The Picture of Dorian Gray 12',
    author: LIST_AUTHOR[1],
    price: 250000,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[1],
    form: LIST_FORM[4],
    publisher: LIST_PUBLISHER[5],
    count: 1,
    stock: 5,
    id: '9',
  },
  {
    name: 'The Picture of Dorian 44v',
    author: LIST_AUTHOR[3],
    price: 1900,
    priceNotSale: 1000000,
    isLiked: false,
    rating: 4.7,
    width: 113,
    height: 50,
    thick: 20,
    pageCount: 100,
    description:
      'CHUYỆN KỂ VỀ TÌNH YÊU VÀ BÓNG TỐI  là hồi ký về những năm tháng đầu đời của Amos Oz. Những ký ức thời thơ ấu, từ căn nhà đã chật chội lại còn ngập trong sách, người bố thiên kinh vạn quyển ưa tầm chương trích cú, người mẹ học thức dịu dàng mà cũng bí ẩn khôn dò, cho tới những lớp học của cô...',
    category: CATEGORY[2],
    form: LIST_FORM[5],
    publisher: LIST_PUBLISHER[4],
    count: 1,
    stock: 5,
    id: '10',
  },
];

const LIST_SHIPPING_ADDRESS: DataModels.IShippingAddress[] = [
  {
    address: '115 Chu Thien',
    city: 'Ho Chi Minh City',
    district: 'Tan Phu District',
    id: '1',
    shippingFee: 10000,
    ward: 'Hiep Tan Ward',
    primary: false,
    name: 'Lu Quang Dung',
    phoneNumber: '0933522615',
  },
  {
    address: '117 Nguyen Cuu Dam',
    city: 'Ho Chi Minh City',
    district: 'Tan Phu District',
    id: '2',
    shippingFee: 17000,
    ward: 'Ward 12',
    primary: true,
    name: 'Quang Dung Quang Dung',
    phoneNumber: '0933522615',
  },
  {
    address: '117 Nguyen Cuu Dam',
    city: 'Ho Chi Minh City',
    district: 'Tan Phu District',
    id: '3',
    shippingFee: 20000,
    ward: 'Ward 17',
    primary: false,
    name: 'Quang Dung',
    phoneNumber: '0933522615',
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

const LIST_CREDIT_CARD: DataModels.ICreditCard[] = [
  {
    cardHolder: 'LU QUANG DUNG',
    cartType: 'visa',
    cardNumber: '3214xxxxxxxx2345',
  },
  {
    cardHolder: 'LU QUANG DUNG',
    cartType: 'jcb',
    cardNumber: '3212xxxxxxxx2344',
  },
  {
    cardHolder: 'LU QUANG DUNG',
    cartType: 'master-card',
    cardNumber: '3214xxxxxxxx2345',
  },
];

const USER: DataModels.IUser = {
  username: 'Joe',
  listShippingAddress: [LIST_SHIPPING_ADDRESS[0], LIST_SHIPPING_ADDRESS[1]],
  listCreditCard: [LIST_CREDIT_CARD[0], LIST_CREDIT_CARD[1]],
};

export {
  CATEGORY,
  LIST_AUTHOR,
  LIST_FORM,
  LIST_PAYMENT_METHOD,
  LIST_PUBLISHER,
  LIST_SHIPPING_ADDRESS,
  LIST_SORT_OPTION,
  LIST_VOUCHER,
  TOP_BOOKS,
  TOP_BOOKS_FILTER,
  USER,
};
