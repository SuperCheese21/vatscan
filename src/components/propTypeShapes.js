import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const screenPropsShape = PropTypes.shape({
  stackNavigation: navigationShape,
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.array.isRequired,
  focusedClient: PropTypes.object.isRequired,
  panelPosition: PropTypes.instanceOf(Animated.Value).isRequired,
  refresh: PropTypes.func.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
  collapsePanel: PropTypes.func.isRequired,
});
