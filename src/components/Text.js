import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  style: Text.propTypes.style,
};

CustomText.defaultProps = {
  children: null,
  style: {},
};

export default CustomText;
