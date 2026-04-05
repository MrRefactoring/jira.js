import { z } from 'zod';

export const EpicRankRequestSchema = z.object({
  rankAfterEpic: z.string().optional(),
  rankBeforeEpic: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type EpicRankRequest = z.infer<typeof EpicRankRequestSchema>;
