import { z } from 'zod';
import { apiObject } from '#/core';
import { ColumnConfigSchema } from './columnConfig';
import { EstimationConfigSchema } from './estimationConfig';
import { RelationSchema } from './relation';
import { RankingConfigSchema } from './rankingConfig';
import { SubquerySchema } from './subquery';

export const BoardConfigSchema = apiObject({
  columnConfig: ColumnConfigSchema.optional(),
  estimation: EstimationConfigSchema.optional(),
  filter: RelationSchema.optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  ranking: RankingConfigSchema.optional(),
  self: z.url().optional(),
  subQuery: SubquerySchema.optional(),
  type: z.string().optional(),
});

export type BoardConfig = z.infer<typeof BoardConfigSchema>;
