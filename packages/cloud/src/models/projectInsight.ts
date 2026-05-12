import { z } from 'zod';

/** Additional details about a project. */
export const ProjectInsightSchema = z.object({
  /** The last issue update time. */
  lastIssueUpdateTime: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** Total issue count. */
  totalIssueCount: z.number().optional(),
});

export type ProjectInsight = z.infer<typeof ProjectInsightSchema>;
