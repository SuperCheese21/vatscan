import React from 'react';
import Text from './Text';

const StatsRow = props => (
    <Text style={{ flex: 1 }} numberOfLines={1}>
        {props.label + '  '}
        <Text style={{ fontSize: 16, color: '#898989' }}>{props.text}</Text>
        <Planned planned={props.planned} />
    </Text>
);

const Planned = ({ planned }) => {
    if (planned) {
        return <Text style={{ fontSize: 12 }}> / {planned}</Text>;
    }
    return null;
};

export default StatsRow;
