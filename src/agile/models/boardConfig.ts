import { z } from 'zod';
import { apiObject } from '#/core';
import { ColumnConfigSchema } from './columnConfig';
import { EstimationConfigSchema } from './estimationConfig';
import { RelationSchema } from './relation';
import { LocationSchema } from './location';

export const BoardConfigSchema = apiObject({
  columnConfig: ColumnConfigSchema.optional(),
  estimation: EstimationConfigSchema.optional(),
  filter: RelationSchema.optional(),
  id: z.number().optional(),
  location: LocationSchema.optional(),
  name: z.string().optional(),
  ranking: apiObject({
    rankCustomFieldId: z.number().optional(),
  }).optional(),
  self: z.url().optional(),
  subQuery: apiObject({
    query: z.string().optional(),
  }).optional(),
  type: z.string().optional(),
});

export type BoardConfig = z.infer<typeof BoardConfigSchema>;
