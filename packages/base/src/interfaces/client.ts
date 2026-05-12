import type { SendRequestOptions } from '../schemas';

export interface Client {
  sendRequest<T>(options: SendRequestOptions<T>): Promise<T>;
}
