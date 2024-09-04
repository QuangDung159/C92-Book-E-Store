import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ReviewServices } from '@services';

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

  async submitReview() {
    const result = await ReviewServices.submitComment(this.review);
    return result;
  }
}

export { ReviewViewModel };
