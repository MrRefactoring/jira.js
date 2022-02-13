import { AgileClient } from './agile';
import { BaseClient } from './clients';
import { Config } from './config';
import { ServiceDeskClient } from './serviceDesk';
import { Version2Client } from './version2';
import { Version3Client } from './version3';

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
