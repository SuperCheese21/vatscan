import React from 'react';
import { Text } from 'react-native';

import { childrenShape } from '../propTypeShapes';

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
  children: childrenShape,
  style: Text.propTypes.style,
};

CustomText.defaultProps = {
  children: null,
  style: {},
};

export default CustomText;
