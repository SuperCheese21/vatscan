import { string } from 'prop-types';
import React from 'react';
import { View, ViewPropTypes } from 'react-native';

import Text from './Text';

import { childrenShape } from '../propTypeShapes';

const ConfigRow = ({ children, label, style }) => (
  <View style={{ padding: 15, ...style }}>
    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{label}</Text>
    {children}
  </View>
);

ConfigRow.propTypes = {
  children: childrenShape,
  label: string.isRequired,
  style: ViewPropTypes.style,
};

ConfigRow.defaultProps = {
  children: null,
  style: {},
};

export default ConfigRow;
