import LocationsScreen from '../screens/locations/locations.component';
import MapScreen from '../screens/map/map.component';
import NewLocationScreen from '../screens/new-location/new-location.component';

const SCREENS = {
  Locations: {
    name: 'screen/locations',
    component: LocationsScreen,
    key: 'screen/locations',
  },
  Map: {
    name: 'screen/map',
    key: 'screen/map',
    component: MapScreen,
  },
  NewLocation: {
    name: 'screen/new-location',
    key: 'screen/new-location',
    component: NewLocationScreen,
  },
};

export default SCREENS;
