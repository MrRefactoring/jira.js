import { z } from 'zod';
import { apiObject } from '#/core';
import { HistoryMetadataSchema } from './historyMetadata';
import { EntityPropertySchema } from './entityProperty';
import { TransitionSchema } from './transition';

export const IssueUpdateSchema = apiObject({
  fields: z.record(z.string(), z.any()).optional(),
  historyMetadata: HistoryMetadataSchema.optional(),
  properties: z.array(EntityPropertySchema).optional(),
  transition: TransitionSchema.optional(),
  update: z.record(z.string(), z.any()).optional(),
});

export type IssueUpdate = z.infer<typeof IssueUpdateSchema>;
