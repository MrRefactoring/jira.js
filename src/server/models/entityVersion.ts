import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityVersionSchema = apiObject({
  deleted: z.boolean().optional(),
  entityId: z.number().optional(),
  entityType: z.string().optional(),
  entityVersion: z.number().optional(),
  hasVersion: z.boolean().optional(),
  parentIssueId: z.number().optional(),
  updateTime: z.coerce.date().optional(),
});

export type EntityVersion = z.infer<typeof EntityVersionSchema>;
