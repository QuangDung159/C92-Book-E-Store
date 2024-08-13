import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class ReviewViewModel {
  review: DataModels.IReviewInput | null = null;

  constructor() {
    makeObservable(this, {
      review: observable,
      setReview: action,
    });
  }

  setReview(value: DataModels.IReviewInput) {
    this.review = value;
  }
}

export { ReviewViewModel };
