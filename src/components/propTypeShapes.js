import PropTypes from 'prop-types';

export const navigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
});

export const screenPropsShape = PropTypes.shape({
  stackNavigation: navigationShape,
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.array.isRequired,
  focusedClient: PropTypes.object.isRequired,
  panelPosition: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  setFocusedClient: PropTypes.func.isRequired,
  collapsePanel: PropTypes.func.isRequired,
});
