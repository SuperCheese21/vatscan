import React from 'react';
import { Text } from 'react-native';

export default ({ children, style }) => (
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
