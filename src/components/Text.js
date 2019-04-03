import React from 'react';
import { Text } from 'react-native';

export default props => (
    <Text
        style={{
            fontFamily: props.style.fontFamily || 'Roboto_Regular',
            ...props.style
        }}
        numberOfLines={1}
    >
        {props.children}
    </Text>
);
