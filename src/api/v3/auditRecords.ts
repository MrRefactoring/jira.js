import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { AuditRecords as AuditRecordsResponse } from '../../models/v3';

export class AuditRecords {
  constructor(private readonly client: Client) { }

  async getAuditRecords(parameters?: {
    offset?: number;
    limit?: number;
    filter?: string;
    from?: string;
    to?: string;
  }, callback?: Callback<AuditRecordsResponse>): Promise<AuditRecordsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/auditing/record',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
