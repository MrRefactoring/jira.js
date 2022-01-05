import {
  ClientType,
  createClient,
  Config,
} from '../../../src';

const config = {
  host: process.env.HOST!,
  authentication: {
    basic: {
      email: process.env.EMAIL!,
      apiToken: process.env.API_TOKEN!,
    },
  },
};

export const getAgileClient = (customConfig?: Partial<Config>) => createClient(ClientType.Agile, { ...config, ...customConfig });
export const getVersion2Client = (customConfig?: Partial<Config>) => createClient(ClientType.Version2, { ...config, ...customConfig });
export const getVersion3Client = (customConfig?: Partial<Config>) => createClient(ClientType.Version3, { ...config, ...customConfig });
