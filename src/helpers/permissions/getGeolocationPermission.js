import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';

const getGeolocationPermission = () => {
  if (Platform.OS === 'ios') {
    return Geolocation.requestAuthorization('whenInUse');
  }

  if (Platform.OS === 'android') {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
};

export default getGeolocationPermission;
