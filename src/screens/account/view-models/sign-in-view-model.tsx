import { action, makeObservable, observable } from 'mobx';

class SignInViewModel {
  email: string = '';
  password: string = '';

  constructor() {
    makeObservable(this, {
      email: observable,
      password: observable,
      setEmail: action,
      setPassword: action,
    });
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  login = async () => {};
}

export { SignInViewModel };
