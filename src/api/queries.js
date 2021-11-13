import { transformPosconData, transformVatsimData } from './fetchUtils';

export default [
  {
    key: 'vatsim',
    name: 'VATSIM',
    sources: {
      clients: 'https://data.vatsim.net/v3/vatsim-data.json',
      controllers:
        'https://cdn.orbxsystems.com/volanta/v1-network-controller.json',
    },
    refetchInterval: 120000,
    transformData: transformVatsimData,
  },
  {
    key: 'poscon',
    name: 'POSCON',
    sources: {
      clients: 'https://hqapi.poscon.net/online.json',
    },
    refetchInterval: 30000,
    transformData: transformPosconData,
  },
];
