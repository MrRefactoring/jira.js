import { AppMonitoringRestEntitySchema, type AppMonitoringRestEntity } from '../models/appMonitoringRestEntity';
import { IpdMonitoringRestEntitySchema, type IpdMonitoringRestEntity } from '../models/ipdMonitoringRestEntity';
import type { SetAppMonitoringEnabled } from '../parameters/setAppMonitoringEnabled';
import type { SetIpdMonitoringEnabled } from '../parameters/setIpdMonitoringEnabled';
import type { Client, SendRequestOptions } from '#/core';

/** Checks if App Monitoring is enabled */
export async function isAppMonitoringEnabled(client: Client): Promise<AppMonitoringRestEntity> {
  const config: SendRequestOptions<AppMonitoringRestEntity> = {
    url: '/rest/api/2/monitoring/app',
    method: 'GET',
    schema: AppMonitoringRestEntitySchema,
  };

  return await client.sendRequest(config);
}

/** Enables or disables App Monitoring */
export async function setAppMonitoringEnabled(client: Client, parameters: SetAppMonitoringEnabled): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/monitoring/app',
    method: 'POST',
    body: {
      enabled: parameters.enabled,
    },
  };

  return await client.sendRequest(config);
}

/** Checks if IPD Monitoring is enabled */
export async function isIpdMonitoringEnabled(client: Client): Promise<IpdMonitoringRestEntity> {
  const config: SendRequestOptions<IpdMonitoringRestEntity> = {
    url: '/rest/api/2/monitoring/ipd',
    method: 'GET',
    schema: IpdMonitoringRestEntitySchema,
  };

  return await client.sendRequest(config);
}

/** Enables or disables IPD Monitoring */
export async function setIpdMonitoringEnabled(client: Client, parameters: SetIpdMonitoringEnabled): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/monitoring/ipd',
    method: 'POST',
    body: {
      enabled: parameters.enabled,
    },
  };

  return await client.sendRequest(config);
}

/** Checks if JMX metrics are being exposed */
export async function areMetricsExposed(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/monitoring/jmx/areMetricsExposed',
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Gets the available JMX metrics */
export async function getAvailableMetrics(client: Client): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/monitoring/jmx/getAvailableMetrics',
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Starts exposing JMX metrics */
export async function start(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/monitoring/jmx/startExposing',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Stops exposing JMX metrics */
export async function stop(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/monitoring/jmx/stopExposing',
    method: 'POST',
  };

  return await client.sendRequest(config);
}
