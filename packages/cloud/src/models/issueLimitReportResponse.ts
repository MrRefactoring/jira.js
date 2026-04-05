import { z } from 'zod';

export const IssueLimitReportResponseSchema = z.object({
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit: z.record(z.string(), z.any()).optional(),
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit: z.record(z.string(), z.any()).optional(),
  /** The fields and their defined limits */
  limits: z.record(z.string(), z.any()).optional(),
});

export type IssueLimitReportResponse = z.infer<typeof IssueLimitReportResponseSchema>;
