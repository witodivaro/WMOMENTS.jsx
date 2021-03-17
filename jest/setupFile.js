jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));

jest.mock('react-native', () => ({
  StyleSheet: {
    create: () => ({}),
  },
  Platform: {
    select: () => ({}),
  },
  Dimensions: {
    get: () => ({}),
  },
  NativeModules: {
    UIManager: {
      RCTView: () => {},
    },
    RNGestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      State: {},
      Directions: {},
    },
  },
  Linking: {
    addEventListener: () => ({}),
  },
  AppState: {
    addEventListener: () => ({}),
  },
  BackHandler: {
    addEventListener: () => ({}),
  },
  SafeAreaView: 'SafeAreaView',
  StatusBar: 'StatusBar',
}));
