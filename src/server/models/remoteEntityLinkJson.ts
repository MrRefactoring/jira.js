import { z } from 'zod';
import { apiObject } from '#/core';

export const RemoteEntityLinkJsonSchema = apiObject({
  /** The link itself. Any JSON. */
  link: z.unknown().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type RemoteEntityLinkJson = z.infer<typeof RemoteEntityLinkJsonSchema>;
