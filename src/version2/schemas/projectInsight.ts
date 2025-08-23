import { z } from 'zod';

/** Additional details about a project. */
export const ProjectInsightSchema = z.object({
  /** The last issue update time. */
  lastIssueUpdateTime: z.string().datetime().optional(),
  /** Total issue count. */
  totalIssueCount: z.number().int().optional(),
});

export type ProjectInsight = z.infer<typeof ProjectInsightSchema>;
