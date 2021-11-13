import { useQueries } from 'react-query';

import { fetchData } from './fetchUtils';
import dataSources from './queries';
import { useAppContext } from '../context';

export const useClientData = () => {
  const { filters } = useAppContext();
  const results = useQueries(
    dataSources.reduce(
      (acc, { key, sources, refetchInterval, transformData, ...source }) =>
        filters.dataSources[key]
          ? [
              ...acc,
              {
                queryKey: key,
                queryFn: () => fetchData(sources),
                refetchInterval,
                select: transformData,
                ...source,
                initialData: [],
              },
            ]
          : acc,
      [],
    ),
  );
  const isDataLoading = results.some(({ isLoading }) => isLoading);
  const clientData = results.flatMap(({ data }) => data);
  return {
    isLoading: isDataLoading,
    clientData,
    results,
  };
};

export default useClientData;
