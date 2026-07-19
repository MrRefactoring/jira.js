import type { SendRequestOptions } from '../schemas/index.js';

export interface Client {
  sendRequest<T>(options: SendRequestOptions<T>): Promise<T>;
}
