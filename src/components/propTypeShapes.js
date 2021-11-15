import PropTypes from 'prop-types';

export const childrenShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

export const navigationShape = PropTypes.shape({
  goBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
});
