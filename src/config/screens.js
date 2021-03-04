import LocationDetailsScreen from '../screens/location-details/location-details.component';
import LocationsScreen from '../screens/locations/locations.component';
import MapScreen from '../screens/map/map.component';
import NewLocationScreen from '../screens/new-location/new-location.component';

const SCREENS = {
  Locations: {
    name: 'locations',
    component: LocationsScreen,
    key: 'screen/locations',
  },
  Map: {
    name: 'map',
    key: 'screen/map',
    component: MapScreen,
  },
  NewLocation: {
    name: 'new-location',
    key: 'screen/new-location',
    component: NewLocationScreen,
  },
  LocationDetails: {
    name: 'location-details',
    key: 'screen/location-details',
    component: LocationDetailsScreen,
  },
};

export default SCREENS;
