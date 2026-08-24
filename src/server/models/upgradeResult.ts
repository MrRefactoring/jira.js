import { z } from 'zod';
import { apiObject } from '#/core';

export const UpgradeResultSchema = apiObject({
  duration: z.number().optional(),
  message: z.string().optional(),
  outcome: z.string().optional(),
  startTime: z.coerce.date().optional(),
});

export type UpgradeResult = z.infer<typeof UpgradeResultSchema>;
