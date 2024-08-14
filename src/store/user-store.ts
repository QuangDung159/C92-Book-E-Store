import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';

class UserStore {
  userProfile: DataModels.IUser | null = null;

  constructor() {
    makeObservable(this, {
      userProfile: observable,
      setUserProfile: action,
    });
  }

  setUserProfile(value: DataModels.IUser) {
    this.userProfile = value;
  }
}

export { UserStore };
