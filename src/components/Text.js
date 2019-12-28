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
  children: PropTypes.string.isRequired,
  style: Text.propTypes.style,
};

CustomText.defaultProps = {
  style: {},
};

export default CustomText;
