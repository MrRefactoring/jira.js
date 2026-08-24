import type { SendRequestOptions } from '../schemas/index.js';

export interface Client {
  sendRequest<T>(options: SendRequestOptions<T>): Promise<T>;

  /**
   * The site this client sends to, as configured.
   *
   * Absent under Cloud OAuth 2.0 (3LO), where the base URL is derived per request from the accessible resources, and
   * absent on a client written by hand. A caller that needs to name the site — `getTenantContext` does — must treat
   * it as optional.
   */
  readonly host?: string;
}
