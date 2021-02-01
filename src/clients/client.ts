import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

type TelemetryData = any;

export interface Client {
  sendRequest<T>(requestConfig: RequestConfig, callback?: Callback<T> | undefined, telemetryData?: Partial<TelemetryData>): Promise<T>;
  sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>, telemetryData?: Partial<TelemetryData>): Promise<void>;
}
