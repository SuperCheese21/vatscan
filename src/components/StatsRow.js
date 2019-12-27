import React from 'react';

import Text from './Text';

const StatsRow = ({ label, planned, text }) => (
  <Text style={{ flex: 1 }} numberOfLines={1}>
    {`${label}  `}
    <Text style={{ fontSize: 16, color: '#898989' }}>{text}</Text>
    <Planned planned={planned} />
  </Text>
);

const Planned = ({ planned }) => {
  if (planned) {
    return <Text style={{ fontSize: 12 }}>{` / ${planned}`}</Text>;
  }
  return null;
};

export default StatsRow;
