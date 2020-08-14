import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class AuditRecords {
  constructor(private readonly client: Sender) {}

  public async getAuditRecords(
    params?: {
      offset?: number;
      limit?: number;
      filter?: string;
      from?: string;
      to?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.AuditRecords> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/auditing/record',
      method: 'GET',
      params: {
        offset: params.offset,
        limit: params.limit,
        filter: params.filter,
        from: params.from,
        to: params.to,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
