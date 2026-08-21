import { z } from 'zod';
import { apiObject } from '#/core';

export const RankingConfigSchema = apiObject({
  rankCustomFieldId: z.number().optional(),
});

export type RankingConfig = z.infer<typeof RankingConfigSchema>;
