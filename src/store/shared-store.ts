import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { action, makeObservable, observable } from 'mobx';
import { DataModels } from '@models';
import { ConfigServices } from '@services';
import { ToastHelpers } from '@utils';

class SharedStore {
  showLoading: boolean = false;
  listConfig: DataModels.IConfig[] = [];
  geoLocation: DataModels.IReverseGeocode | null = null;
  appLinkUrl?: string = '';

  constructor() {
    makeObservable(this, {
      showLoading: observable,
      listConfig: observable,
      geoLocation: observable,
      appLinkUrl: observable,
      setAppLinkUrl: action,
      setGeoLocation: action,
      setListConfig: action,
      setShowLoading: action,
    });
  }

  setAppLinkUrl(value?: string) {
    this.appLinkUrl = value;
  }

  setGeoLocation(value: DataModels.IReverseGeocode) {
    this.geoLocation = value;
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

  getGeoLocation = async () => {
    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      ToastHelpers.showToast({
        title: 'Permission to access location was denied',
      });
      return;
    }

    // Get current position
    const currentLocation = await Location.getCurrentPositionAsync({});

    // Reverse geocode to get city/province from lat/lng
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    // Assuming the first result is the most relevant
    if (reverseGeocode.length > 0) {
      this.setGeoLocation(reverseGeocode[0]);
    }
  };
}

export { SharedStore };
