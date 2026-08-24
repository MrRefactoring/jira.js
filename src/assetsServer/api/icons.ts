import { IconSchema, type Icon } from '../models/icon';
import type { FindIcons } from '../parameters/findIcons';
import type { GetIcon } from '../parameters/getIcon';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Get all global icons i.e. icons not associated with a particular object schema. */
export async function findGlobalIcons(client: Client, options?: RequestOptions): Promise<Icon[]> {
  const config: SendRequestOptions<Icon[]> = {
    url: '/rest/assets/1.0/icon/global',
    method: 'GET',
    schema: z.array(IconSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get all icons associated with an object schema. This resource will not include global icons. */
export async function findIcons(client: Client, parameters: FindIcons, options?: RequestOptions): Promise<Icon[]> {
  const config: SendRequestOptions<Icon[]> = {
    url: `/rest/assets/1.0/icon/objectschema/${parameters.id}`,
    method: 'GET',
    schema: z.array(IconSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get a single icon by ID. */
export async function getIcon(client: Client, parameters: GetIcon, options?: RequestOptions): Promise<Icon> {
  const config: SendRequestOptions<Icon> = {
    url: `/rest/assets/1.0/icon/${parameters.id}`,
    method: 'GET',
    schema: IconSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
