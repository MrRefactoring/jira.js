import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueLinkTypeJsonSchema = apiObject({
  id: z.string().optional(),
  inward: z.string().optional(),
  name: z.string().optional(),
  outward: z.string().optional(),
  self: z.url().optional(),
});

export type IssueLinkTypeJson = z.infer<typeof IssueLinkTypeJsonSchema>;
