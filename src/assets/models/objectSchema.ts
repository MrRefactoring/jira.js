import { z } from 'zod';
import { apiObject } from '#/core';

export const ObjectSchemaSchema = apiObject({
  workspaceId: z.string(),
  globalId: z.string(),
  id: z.string(),
  name: z.string(),
  objectSchemaKey: z.string(),
  description: z.string().optional(),
  /** Always 'Ok' */
  status: z.string().optional(),
  created: z.coerce.date(),
  updated: z.coerce.date(),
  objectCount: z.number(),
  objectTypeCount: z.number(),
  canManage: z.boolean().optional(),
});

export type ObjectSchema = z.infer<typeof ObjectSchemaSchema>;
