import React from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { string } from 'prop-types';

export const TabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

TabBarIcon.propTypes = {
  tintColor: string.isRequired,
};

export default TabBarIcon;
