import { z } from 'zod';

export const StartReindexInsightSchema = z.object({
  /** If true, the index will be cleaned before the reindex starts. */
  clean: z.string().optional(),
});

export type StartReindexInsight = z.input<typeof StartReindexInsightSchema>;
