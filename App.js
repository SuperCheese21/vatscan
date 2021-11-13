import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppContainer from './src/components/AppContainer';
import { AppProvider } from './src/context';

const queryClient = new QueryClient();

export default () => (
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <AppContainer />
    </QueryClientProvider>
  </AppProvider>
);
