import { z } from 'zod';

export const ReportsResponseSchema = z.object({
  reports: z.array(z.record(z.string(), z.any())).optional(),
});

export type ReportsResponse = z.infer<typeof ReportsResponseSchema>;
