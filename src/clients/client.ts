import type { Telemetry } from 'telemetry.jira.js';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: never, telemetryData?: Partial<Telemetry>): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T>, telemetryData?: Partial<Telemetry>): Promise<void>;
}
