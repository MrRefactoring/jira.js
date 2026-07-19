import { z } from 'zod';
import { apiObject } from '#/core';
/** Additional details about a project. */

export const ProjectInsightSchema = apiObject({
  /** The last issue update time. */
  lastIssueUpdateTime: z.coerce.date().optional(),
  /** Total issue count. */
  totalIssueCount: z.number().optional(),
});

export type ProjectInsight = z.infer<typeof ProjectInsightSchema>;
