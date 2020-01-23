import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export const animatedValueShape = PropTypes.instanceOf(Animated.Value);

export const childrenShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

export const clientsShape = PropTypes.arrayOf(PropTypes.object);

export const navigationShape = PropTypes.shape({
  goBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
});

export const screenPropsShape = PropTypes.shape({
  stackNavigation: navigationShape,
});
