import AsyncStorage from '@react-native-async-storage/async-storage';
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

  setStorageValue = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('e :>> ', e);
    }
  };

  getStorageValue = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('value :>> ', value);
      if (value !== null) {
        return value;
      }

      return null;
    } catch (e) {
      // error reading value
      console.log('e :>> ', e);
    }
  };

  removeStorageItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('e :>> ', e);
    }
  };
}

export { SharedStore };
