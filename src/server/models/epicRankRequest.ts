import { z } from 'zod';
import { apiObject } from '#/core';

export const EpicRankRequestSchema = apiObject({
  rankAfterEpic: z.string().optional(),
  rankBeforeEpic: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type EpicRankRequest = z.infer<typeof EpicRankRequestSchema>;
