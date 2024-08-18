import { makeObservable, observable } from 'mobx';
import { USER } from '@constants';
import { DataModels } from '@models';
import { delay } from '@utils';
import { UserStore } from './user-store';

class AuthenticationStore {
  userStore: UserStore | null = null;

  constructor(userStore: UserStore) {
    makeObservable(this, {
      userStore: observable,
    });

    this.userStore = userStore;
  }

  signIn = async (username: string, password: string) => {
    await delay(1000);
    this.userStore.setUserProfile({
      ...USER,
      username,
      password,
    });
  };

  signUp = async (user: DataModels.IUser) => {
    await delay(1000);
    this.userStore.setUserProfile({
      ...USER,
      email: user.email,
      username: user.username,
    });
  };

  signOut = async () => {
    this.userStore.setUserProfile(null);
  };
}

export { AuthenticationStore };
