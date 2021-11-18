import { arrayOf, func, node, number, oneOfType, shape } from 'prop-types';

export const childrenShape = oneOfType([node, arrayOf(node)]);

export const navigationShape = shape({
  goBack: func.isRequired,
  navigate: func.isRequired,
});

export const mapRegionShape = shape({
  latitude: number.isRequired,
  longitude: number.isRequired,
  latitudeDelta: number.isRequired,
  longitudeDelta: number.isRequired,
});
