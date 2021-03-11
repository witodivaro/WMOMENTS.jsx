import MomentDetailsScreen from '../screens/moment-details/moment-details.component';
import MapScreen from '../screens/map/map.component';
import NewMomentScreen from '../screens/new-moment/new-moment.component';
import MomentsScreen from '../screens/moments/moments.component';

const SCREENS = {
  Moments: {
    name: 'moments',
    component: MomentsScreen,
    key: 'screen/moments',
  },
  Map: {
    name: 'map',
    key: 'screen/map',
    component: MapScreen,
  },
  NewMoment: {
    name: 'new-moment',
    key: 'screen/new-moment',
    component: NewMomentScreen,
  },
  MomentDetails: {
    name: 'moment-details',
    key: 'screen/moment-details',
    component: MomentDetailsScreen,
  },
};

export default SCREENS;
