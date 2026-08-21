import { ImportSourceResponseSchema, type ImportSourceResponse } from '../models/importSourceResponse';
import { ImportSchemaAndMappingSchema, type ImportSchemaAndMapping } from '../models/importSchemaAndMapping';
import { GetImportScheduleLinksSchema, type GetImportScheduleLinks } from '../models/getImportScheduleLinks';
import { ImportScheduleResponseSchema, type ImportScheduleResponse } from '../models/importScheduleResponse';
import type { GetImportSource } from '../parameters/getImportSource';
import type { SubmitSchemaAndMapping } from '../parameters/submitSchemaAndMapping';
import type { UpdateSchemaAndMapping } from '../parameters/updateSchemaAndMapping';
import type { GetSchemaAndMappingProgress } from '../parameters/getSchemaAndMappingProgress';
import type { GetImportConfigurationStatus } from '../parameters/getImportConfigurationStatus';
import type { GetSchemaAndMapping } from '../parameters/getSchemaAndMapping';
import type { StartImportExecution } from '../parameters/startImportExecution';
import type { CancelImportExecution } from '../parameters/cancelImportExecution';
import type { SubmitImportExecutionProgress } from '../parameters/submitImportExecutionProgress';
import type { SubmitImportExecutionData } from '../parameters/submitImportExecutionData';
import type { GetImportExecutionStatus } from '../parameters/getImportExecutionStatus';
import type { GetLatestImportExecutionStatus } from '../parameters/getLatestImportExecutionStatus';
import type { CreateFailedImportHistory } from '../parameters/createFailedImportHistory';
import type { GenerateImportSourceToken } from '../parameters/generateImportSourceToken';
import type { GetImportScheduleLinks as GetImportScheduleLinksParameters } from '../parameters/getImportScheduleLinks';
import type { CreateImportSchedule } from '../parameters/createImportSchedule';
import type { GetImportSchedule } from '../parameters/getImportSchedule';
import type { UpdateImportSchedule } from '../parameters/updateImportSchedule';
import type { DeleteImportSchedule } from '../parameters/deleteImportSchedule';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Retrieves a specific import source configuration by its ID. If scheduled imports are enabled, the response includes
 * scheduling information.
 */
export async function getImportSource(client: Client, parameters: GetImportSource): Promise<ImportSourceResponse> {
  const config: SendRequestOptions<ImportSourceResponse> = {
    url: `/importsource/${parameters.id}`,
    method: 'GET',
    schema: ImportSourceResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Provide object schema and mapping configuration for the external import */
export async function submitSchemaAndMapping(client: Client, parameters: SubmitSchemaAndMapping): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/mapping`,
    method: 'PUT',
    searchParams: {
      async: parameters.async,
    },
    body: {
      schema: parameters.schema,
      mapping: parameters.mapping,
    },
  };

  return await client.sendRequest(config);
}

/** Update object schema and mapping configuration for the external import */
export async function updateSchemaAndMapping(client: Client, parameters: UpdateSchemaAndMapping): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/mapping`,
    method: 'PATCH',
    searchParams: {
      async: parameters.async,
    },
    body: {
      schema: parameters.schema,
      mapping: parameters.mapping,
    },
  };

  return await client.sendRequest(config);
}

/** Get the progress of an asynchronous schema and mapping operation */
export async function getSchemaAndMappingProgress(
  client: Client,
  parameters: GetSchemaAndMappingProgress,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/mapping/progress/${parameters.resourceId}`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Get the current status of the import configuration */
export async function getImportConfigurationStatus(
  client: Client,
  parameters: GetImportConfigurationStatus,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/configstatus`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Get the current schema and mapping of the import configuration */
export async function getSchemaAndMapping(
  client: Client,
  parameters: GetSchemaAndMapping,
): Promise<ImportSchemaAndMapping> {
  const config: SendRequestOptions<ImportSchemaAndMapping> = {
    url: `/importsource/${parameters.importSourceId}/schema-and-mapping`,
    method: 'GET',
    schema: ImportSchemaAndMappingSchema,
  };

  return await client.sendRequest(config);
}

/** Move to the data ingestion steps of external imports */
export async function startImportExecution(client: Client, parameters: StartImportExecution): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Cancel current on-going import */
export async function cancelImportExecution(client: Client, parameters: CancelImportExecution): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/${parameters.importExecutionId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Submit progress of ingesting data */
export async function submitImportExecutionProgress(
  client: Client,
  parameters: SubmitImportExecutionProgress,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/${parameters.importExecutionId}/progress`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Providing data to be ingested */
export async function submitImportExecutionData(client: Client, parameters: SubmitImportExecutionData): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/${parameters.importExecutionId}/data`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Get the status of the import */
export async function getImportExecutionStatus(client: Client, parameters: GetImportExecutionStatus): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/${parameters.importExecutionId}/status`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Get the status of the most recently created import execution */
export async function getLatestImportExecutionStatus(
  client: Client,
  parameters: GetLatestImportExecutionStatus,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/status`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Creates a failed import history record for the specified import source and execution with the given failure reason */
export async function createFailedImportHistory(client: Client, parameters: CreateFailedImportHistory): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/executions/${parameters.executionId}/history/failed`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Generate a Bearer token which can be used to authenticate against Assets `/importsource/` APIs, to take actions
 * against the specified import source.
 */
export async function generateImportSourceToken(client: Client, parameters: GenerateImportSourceToken): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/token`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve links for import schedule operations (create, get, update, delete). Returns a createSchedule link to POST a
 * new schedule, and if a schedule already exists, returns a schedule link that can be used with GET, PUT, or DELETE
 * operations.
 */
export async function getImportScheduleLinks(
  client: Client,
  parameters: GetImportScheduleLinksParameters,
): Promise<GetImportScheduleLinks> {
  const config: SendRequestOptions<GetImportScheduleLinks> = {
    url: `/importsource/${parameters.importSourceId}/schedule`,
    method: 'GET',
    schema: GetImportScheduleLinksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new scheduled import configuration for the specified import source. Scheduled imports allow you to automate
 * data imports on a recurring basis (daily, weekly, monthly) or run them once at a specific time.
 */
export async function createImportSchedule(
  client: Client,
  parameters: CreateImportSchedule,
): Promise<ImportScheduleResponse> {
  const config: SendRequestOptions<ImportScheduleResponse> = {
    url: `/importsource/${parameters.importSourceId}/importschedule`,
    method: 'POST',
    body: {
      startTime: parameters.startTime,
      runInterval: parameters.runInterval,
      callbackUrl: parameters.callbackUrl,
    },
    schema: ImportScheduleResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Retrieves a specific scheduled import configuration by ID */
export async function getImportSchedule(
  client: Client,
  parameters: GetImportSchedule,
): Promise<ImportScheduleResponse> {
  const config: SendRequestOptions<ImportScheduleResponse> = {
    url: `/importsource/${parameters.importSourceId}/importschedule/${parameters.importScheduleId}`,
    method: 'GET',
    schema: ImportScheduleResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Updates an existing scheduled import configuration. You can modify the start time, run interval, or callback URL. */
export async function updateImportSchedule(
  client: Client,
  parameters: UpdateImportSchedule,
): Promise<ImportScheduleResponse> {
  const config: SendRequestOptions<ImportScheduleResponse> = {
    url: `/importsource/${parameters.importSourceId}/importschedule/${parameters.importScheduleId}`,
    method: 'PUT',
    body: {
      startTime: parameters.startTime,
      runInterval: parameters.runInterval,
      callbackUrl: parameters.callbackUrl,
    },
    schema: ImportScheduleResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes a scheduled import configuration. The import source will remain, but will no longer execute on a schedule. */
export async function deleteImportSchedule(client: Client, parameters: DeleteImportSchedule): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/importsource/${parameters.importSourceId}/importschedule/${parameters.importScheduleId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
