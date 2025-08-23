import { z } from 'zod';

export const IssueLimitReportResponseBeanSchema = z.object({
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit: z.object({}).optional(),
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit: z.object({}).optional(),
  /** The fields and their defined limits */
  limits: z.object({}).optional(),
});

export type IssueLimitReportResponseBean = z.infer<typeof IssueLimitReportResponseBeanSchema>;
