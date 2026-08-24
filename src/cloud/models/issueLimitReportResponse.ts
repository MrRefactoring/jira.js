import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueLimitReportResponseSchema = apiObject({
  /**
   * For each field, the ids of the individual entities breaching the limit, grouped by the id or key of the issue they
   * belong to. Fields that hold a single value, such as description and environment, map to an empty list because the
   * issue itself identifies the breaching content
   */
  entitiesBreachingLimit: z.record(z.string(), z.any()).optional(),
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit: z.record(z.string(), z.any()).optional(),
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit: z.record(z.string(), z.any()).optional(),
  /** The fields and their defined limits */
  limits: z.record(z.string(), z.any()).optional(),
});

export type IssueLimitReportResponse = z.infer<typeof IssueLimitReportResponseSchema>;
