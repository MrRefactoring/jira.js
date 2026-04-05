import { z } from 'zod';

export const RankingConfigSchema = z.object({
  rankCustomFieldId: z.number().optional(),
});

export type RankingConfig = z.infer<typeof RankingConfigSchema>;
