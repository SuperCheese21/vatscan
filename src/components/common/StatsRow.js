import { number, oneOfType, string } from 'prop-types';
import React from 'react';

import Text from './Text';

const StatsRow = ({ label, planned, text }) => (
  <Text style={{ flex: 1 }} numberOfLines={1}>
    {`${label}  `}
    <Text style={{ fontSize: 16, color: '#898989' }}>{text}</Text>
    <Text style={{ fontSize: 12 }}>{planned ? ` / ${planned}` : ''}</Text>
  </Text>
);

StatsRow.propTypes = {
  label: string.isRequired,
  planned: oneOfType([string, number]),
  text: oneOfType([string, number]),
};

StatsRow.defaultProps = {
  planned: '',
  text: '',
};

export default StatsRow;
