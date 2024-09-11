import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ConfigServices } from '@services';

class SharedStore {
  showLoading: boolean = false;
  listConfig: DataModels.IConfig[] = [];

  constructor() {
    makeObservable(this, {
      showLoading: observable,
      listConfig: observable,
      setListConfig: action,
      setShowLoading: action,
    });
  }

  setListConfig(values: DataModels.IConfig[]) {
    this.listConfig = values;
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

  fetchListConfig = async () => {
    const result = await ConfigServices.fetchAllConfig();

    if (result?.success && result.data) {
      this.setListConfig(result.data.listConfig);
    }
  };

  getConfig = (key: string) => {
    const config = this.listConfig.find((item) => item.key === key);

    return config?.value || null;
  };
}

export { SharedStore };
