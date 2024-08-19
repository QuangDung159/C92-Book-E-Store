import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class CartViewModel {
  review: DataModels.IReviewInput | null = null;
  listCartItem: DataModels.ICartItem[] = [];

  constructor() {
    makeObservable(this, {
      review: observable,
      setReview: action,
      resetReview: action,
    });
  }

  setReview(value: DataModels.IReviewInput) {
    this.review = value;
  }

  resetReview() {
    this.review = {
      ...this.review,
      rating: 0,
    };
  }
}

export { CartViewModel };
