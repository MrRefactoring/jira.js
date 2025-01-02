import { AgileClient } from './agile/index.js';
import { BaseClient } from './clients/index.js';
import type { Config } from './config.js';
import { ServiceDeskClient } from './serviceDesk/index.js';
import { Version2Client } from './version2/index.js';
import { Version3Client } from './version3/index.js';

export enum ClientType {
  Agile = 'agile',
  Version2 = 'version2',
  Version3 = 'version3',
  ServiceDesk = 'serviceDesk',
}

export function createClient(clientType: ClientType.Agile, config: Config): AgileClient;
export function createClient(clientType: ClientType.Version2, config: Config): Version2Client;
export function createClient(clientType: ClientType.Version3, config: Config): Version3Client;
export function createClient(clientType: ClientType, config: Config): BaseClient {
  switch (clientType) {
    case ClientType.Agile:
      return new AgileClient(config);
    case ClientType.Version2:
      return new Version2Client(config);
    case ClientType.Version3:
      return new Version3Client(config);
    case ClientType.ServiceDesk:
      return new ServiceDeskClient(config);
    default:
      return new BaseClient(config);
  }
}
