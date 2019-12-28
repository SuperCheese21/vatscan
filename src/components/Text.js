import PropTypes from 'prop-types';
import React from 'react';
import { Text, ViewPropTypes } from 'react-native';

const CustomText = ({ children, style }) => (
  <Text
    style={{
      fontFamily: style.fontFamily || 'Roboto_Regular',
      ...style,
    }}
    numberOfLines={1}
  >
    {children}
  </Text>
);

CustomText.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  style: ViewPropTypes.styles,
};

CustomText.defaultProps = {
  style: {},
};

export default CustomText;
