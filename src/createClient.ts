import { ClientConfig } from './clientConfig';
import {
  BaseClient,
} from './clients';
import { AgileClient } from './agile';
import { Version2Client } from './version2';
import { Version3Client } from './version3';

export enum ClientType {
  Agile = 'agile',
  Version2 = 'version2',
  Version3 = 'version3',
}

export function createClient(clientType: ClientType.Agile, clientConfig: ClientConfig): AgileClient;
export function createClient(clientType: ClientType.Version2, clientConfig: ClientConfig): Version2Client;
export function createClient(clientType: ClientType.Version3, clientConfig: ClientConfig): Version3Client;
export function createClient(clientType: ClientType, clientConfig: ClientConfig): BaseClient {
  switch (clientType) {
    case ClientType.Agile:
      return new AgileClient(clientConfig);
    case ClientType.Version2:
      return new Version2Client(clientConfig);
    case ClientType.Version3:
      return new Version3Client(clientConfig);
    default:
      return new BaseClient(clientConfig);
  }
}
