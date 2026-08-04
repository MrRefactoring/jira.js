import { z } from 'zod';
import { apiObject } from '#/core';
import { ColumnConfigSchema } from './columnConfig';
import { EstimationConfigSchema } from './estimationConfig';
import { RelationSchema } from './relation';

export const GetConfigurationSchema = apiObject({
  columnConfig: ColumnConfigSchema.optional(),
  estimation: EstimationConfigSchema.optional(),
  filter: RelationSchema.optional(),
  id: z.number().optional(),
  location: apiObject({
    projectKeyOrId: z.string().optional(),
    type: z.enum(['project', 'user']).optional(),
    id: z.string().optional(),
    key: z.string().optional(),
    name: z.string().optional(),
    self: z.string().optional(),
  }).optional(),
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

export type GetConfiguration = z.infer<typeof GetConfigurationSchema>;
