import axios from 'axios';
import { PACKAGE_NAME } from '@constants';
import { sharedStore } from '@store';

const getLatestVersionAndroid = async () => {
  try {
    const response = await axios.get(
      `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}&hl=en`,
    );

    const versionRegex = /\["(\d+\.\d+\.\d+)"\]/;
    const match = response.data.match(versionRegex);
    const latest = match ? match[1] : null;

    console.log('getLatestVersionAndroid :>> ', latest);

    return latest;
  } catch (error) {
    console.error('getLatestVersionAndroid error:', error);
    return null;
  }
};

const getLatestVersionIOS = async () => {
  try {
    const latest = sharedStore.getConfig('app_version');

    // const response = await axios.get(
    //   `https://itunes.apple.com/lookup?id=${APP_ID}`,
    // );

    // const latest = response.data.results[0]?.version || null;

    console.log('getLatestVersionIOS :>> ', latest);

    return latest;
  } catch (error) {
    console.error('getLatestVersionIOS error:', error);
    return null;
  }
};

export const AppVersionServices = {
  getLatestVersionAndroid,
  getLatestVersionIOS,
};
