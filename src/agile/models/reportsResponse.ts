import { z } from 'zod';
import { apiObject } from '#/core';

export const ReportsResponseSchema = apiObject({
  reports: z.array(z.record(z.string(), z.any())).optional(),
});

export type ReportsResponse = z.infer<typeof ReportsResponseSchema>;
