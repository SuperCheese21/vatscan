import { string } from 'prop-types';
import React from 'react';

import Text from './Text';

const StatsLabel = ({ text }) => <Text style={{ fontSize: 18 }}>{text}</Text>;

StatsLabel.propTypes = {
  text: string.isRequired,
};

export default StatsLabel;
