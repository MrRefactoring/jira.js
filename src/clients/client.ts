import type { Request } from '../request';

export interface Client {
  sendRequest<T>(requestConfig: Request): Promise<T>;
}
