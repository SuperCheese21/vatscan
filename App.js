import React from 'react';

import AppContainer from './src/components/AppContainer';
import { AppProvider } from './src/context';

export default () => (
  <AppProvider>
    <AppContainer />
  </AppProvider>
);
