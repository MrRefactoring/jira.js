import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class AuditRecords {
  constructor(private client: Client) { }
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: Callback<T>): Promise<void>;
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: undefined): Promise<T>;
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/auditing/record',
      method: 'GET',
      params: {
        offset: parameters?.offset,
        limit: parameters?.limit,
        filter: parameters?.filter,
        from: parameters?.from,
        to: parameters?.to,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
