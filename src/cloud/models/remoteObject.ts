import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
import { StatusSchema } from './status';
/** The linked item. */

export const RemoteObjectSchema = apiObject({
  icon: IconSchema.optional(),
  status: StatusSchema.optional(),
  /** The summary details of the item. */
  summary: z.string().optional(),
  /** The title of the item. */
  title: z.string(),
  /** The URL of the item. */
  url: z.string(),
});

export type RemoteObject = z.infer<typeof RemoteObjectSchema>;
