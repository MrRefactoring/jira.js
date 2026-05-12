import { RedactionJobStatusResponseSchema, type RedactionJobStatusResponse } from '#/models/redactionJobStatusResponse';
import { type Redact } from '#/parameters/redact';
import { type GetRedactionStatus } from '#/parameters/getRedactionStatus';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields
 * asynchronously.
 *
 * The redaction status can be polled using the job id.
 */
export async function redact(client: Client, parameters: Redact): Promise<string> {
  const config: SendRequestOptions<string> = {
    url: '/rest/api/3/redact',
    method: 'POST',
    body: {
      redactions: parameters.redactions,
    },
    schema: z.string(),
  };

  return await client.sendRequest(config);
}

/**
 * Retrieves the current status of a redaction job ID.
 *
 * The jobStatus will be one of the following:
 *
 * - IN_PROGRESS - The redaction job is currently in progress
 * - COMPLETED - The redaction job has completed successfully.
 * - PENDING - The redaction job has not started yet
 */
export async function getRedactionStatus(
  client: Client,
  parameters: GetRedactionStatus,
): Promise<RedactionJobStatusResponse> {
  const config: SendRequestOptions<RedactionJobStatusResponse> = {
    url: `/rest/api/3/redact/status/${parameters.jobId}`,
    method: 'GET',
    schema: RedactionJobStatusResponseSchema,
  };

  return await client.sendRequest(config);
}
