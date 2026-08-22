import { TerminologyResponseSchema, type TerminologyResponse } from '../models/terminologyResponse';
import type { SetTerminologyEntries } from '../parameters/setTerminologyEntries';
import type { GetTerminologyEntry } from '../parameters/getTerminologyEntry';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all defined names for the default words 'epic' and 'sprint' */
export async function getAllTerminologyEntries(
  client: Client,
  options?: RequestOptions,
): Promise<TerminologyResponse[]> {
  const config: SendRequestOptions<TerminologyResponse[]> = {
    url: '/rest/api/2/terminology/entries',
    method: 'GET',
    schema: z.array(TerminologyResponseSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Change epic/sprint names from {originalName} to {newName}. The {newName} will be displayed in Jira instead of
 * {originalName} {"originalName"} must be equal to "epic" or "sprint". There can be only one entry per unique
 * {"originalName"}. {"newName"} can only consist of alphanumeric characters and spaces e.g. {"newName": "iteration
 * number 2"}. {"newName"} must be between 1 to 100 characters. It can't use the already defined {"newName"} values or
 * restricted JQL words. To reset {"newName"} to the default value, enter the {"originalName"} value as the value for
 * {"newName"}. For example, if you want to return to {"originalName": "sprint"}, enter {"newName": "sprint"}.
 */
export async function setTerminologyEntries(
  client: Client,
  parameters: SetTerminologyEntries,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/terminology/entries',
    method: 'POST',
    body: {
      newName: parameters.newName,
      newNamePlural: parameters.newNamePlural,
      originalName: parameters.originalName,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns epic or sprint name as specified in the {originalName} path param */
export async function getTerminologyEntry(
  client: Client,
  parameters: GetTerminologyEntry,
  options?: RequestOptions,
): Promise<TerminologyResponse> {
  const config: SendRequestOptions<TerminologyResponse> = {
    url: `/rest/api/2/terminology/entries/${parameters.originalName}`,
    method: 'GET',
    schema: TerminologyResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
