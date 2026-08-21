import { IconSchema, type Icon } from '../models/icon';
import type { GetIcon } from '../parameters/getIcon';
import type { GetIconImage } from '../parameters/getIconImage';
import { type Client, type SendRequestOptions, BufferSchema, type Buffer } from '#/core';
import { z } from 'zod';

/** Load a single icon by id */
export async function getIcon(client: Client, parameters: GetIcon): Promise<Icon> {
  const config: SendRequestOptions<Icon> = {
    url: `/icon/${parameters.id}`,
    method: 'GET',
    schema: IconSchema,
  };

  return await client.sendRequest(config);
}

/** Load a single icon PNG by id */
export async function getIconImage(client: Client, parameters: GetIconImage): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/icon/${parameters.id}/icon.png`,
    method: 'GET',
    headers: {
      Accept: 'image/png',
    },
    searchParams: {
      size: parameters.size,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}

/** Return all global icons i.e. icons not associated with a particular object schema */
export async function findGlobalIcons(client: Client): Promise<Icon[]> {
  const config: SendRequestOptions<Icon[]> = {
    url: '/icon/global',
    method: 'GET',
    schema: z.array(IconSchema),
  };

  return await client.sendRequest(config);
}
