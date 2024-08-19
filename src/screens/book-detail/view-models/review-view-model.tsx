import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class ReviewViewModel {
  review: DataModels.IReviewInput | null = null;

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

export { ReviewViewModel };
