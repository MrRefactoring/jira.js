import { ResolutionJsonSchema, type ResolutionJson } from '../models/resolutionJson';
import { ResolutionSchema, type Resolution } from '../models/resolution';
import type { GetPaginatedResolutions } from '../parameters/getPaginatedResolutions';
import type { GetResolution } from '../parameters/getResolution';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns a list of all resolutions. */
export async function getResolutions(client: Client): Promise<ResolutionJson[]> {
  const config: SendRequestOptions<ResolutionJson[]> = {
    url: '/rest/api/2/resolution',
    method: 'GET',
    schema: z.array(ResolutionJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Returns paginated list of filtered resolutions. */
export async function getPaginatedResolutions(
  client: Client,
  parameters?: GetPaginatedResolutions,
): Promise<Resolution> {
  const config: SendRequestOptions<Resolution> = {
    url: '/rest/api/2/resolution/page',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      startAt: parameters?.startAt,
    },
    schema: ResolutionSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a resolution. */
export async function getResolution(client: Client, parameters: GetResolution): Promise<ResolutionJson> {
  const config: SendRequestOptions<ResolutionJson> = {
    url: `/rest/api/2/resolution/${parameters.id}`,
    method: 'GET',
    schema: ResolutionJsonSchema,
  };

  return await client.sendRequest(config);
}
