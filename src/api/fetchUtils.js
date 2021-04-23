import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { getRandomElement } from './utils';

export const fetchData = async (urls, errorTitle) => {
  const url = Array.isArray(urls) ? getRandomElement(urls) : urls;

  // Return null if url is blank
  if (!url) return null;

  // Check internet connection and alert if there is no connection
  const connectionInfo = await NetInfo.fetch();
  if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
    Alert.alert(
      'No internet connection',
      'Connect to the internet to update data',
    );
    return null;
  }

  // Make API request
  try {
    const res = await fetch(url);
    return res;
  } catch (err) {
    Alert.alert(errorTitle, err.message);
    return null;
  }
};

export default fetchData;
