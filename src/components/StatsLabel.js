import PropTypes from 'prop-types';
import React from 'react';

import Text from './Text';

const StatsLabel = ({ text }) => <Text style={{ fontSize: 18 }}>{text}</Text>;

StatsLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StatsLabel;
