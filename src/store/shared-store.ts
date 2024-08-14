import { action, makeObservable, observable } from 'mobx';

class SharedStore {
  showLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      showLoading: observable,
      setShowLoading: action,
    });
  }

  setShowLoading(value: boolean) {
    this.showLoading = value;
  }
}

export { SharedStore };
